<script setup>
	import { computed, onMounted, reactive, ref } from 'vue'
	import { ElTable } from 'element-plus'
	import { openConfirmBox } from "js/common"
	import service from 'apis/api'
	import Message from 'js/Message'
	import _ from 'lodash'

	const emits = defineEmits(['beforeLoaded','afterLoaded'])
	emits('beforeLoaded')
	emits('afterLoaded')
	const tableData = ref([])
	const tableLoading = ref(true)
	const page = reactive({
		current: 1,
		size: 15,
		total: 0,
	})
	const createFormVisible = reactive({
		flag:false
	})
	const searchCondition = reactive({
		searchSelect:"",
		searchInput:"",
	})
	function deleteBox(index) {
		openConfirmBox("确认删除权限？",()=>{
			service.deleteUser({
				userId: tableData.value[index].id
			}).then((res) => {
				Message.success("删除成功")
				getTableData()
			})
		})
	}
	function getTableData() {
		tableLoading.value = true
		const postData = {
			searchMap: {},
			page: page
		}
		postData.searchMap[searchCondition.searchSelect] = searchCondition.searchInput
		service.searchRoles(postData)
			.then((res) => {
				tableLoading.value = false
				tableData.value = res.data.records
				page.total = res.data.total
			})
	}
	const permissionsRemote = ref([])
	const permissionsLoading = ref(true)
	function loadPermissions(flag, index) {
		if (flag == true) {
			if (permissionsRemote.value.length == 0) {
				permissionsLoading.value = true
				service.listPermissions()
					.then((res) => {
						console.log(res)
						permissionsRemote.value = res.data
							.map((value, index) => {
								return {
									key: index,
									label: value.description,
									value: value.id,
								}
							})
							permissionsLoading.value = false
					})
			}
		}
	}
	const updateRole = _.debounce((index) => {
			service.updateRole(tableData.value[index])
				.then((res) => {
					Message.success("提交成功")
					getTableData()
				})
	}, 1000)
	function searchClear() {
		searchCondition.searchInput = ""
		searchCondition.searchSelect = ""
		getTableData()
	}

	const multipleTableRef = ref()
	onMounted(() => {
		getTableData()
		loadPermissions(true)
	})

</script>
<template>
	<div class="user-table-box">
		<div class="button-top-box">
			<div class="button-left-box">
				<el-button type="primary" plain @click="createFormVisible.flag = true">添加角色</el-button>
			</div>
			<div class="button-right-box">
				<el-tooltip content="刷新" effect="light" show-after=1000>
					<el-button circle @click="getTableData">
						<el-icon ><i-ep-refresh-right /></el-icon>
					</el-button>
				</el-tooltip>
				<el-input
					v-model="searchCondition.searchInput"
					placeholder="请输入"
					class="input-with-select"
				>
					<template #prepend>
						<el-select 
							v-model="searchCondition.searchSelect" 
							placeholder="搜索条件" 
							style="width: 100px"
							clearable
							@clear="searchClear"
						>
							<el-option label="权限名" value="id"></el-option>
						</el-select>
					</template>
					<template #append>
						<el-button @click="getTableData">
							<el-icon><i-ep-search /></el-icon>
						</el-button>
					</template>
				</el-input>
			</div>
		</div>
		<el-divider></el-divider>
		<el-table
			ref="multipleTableRef"
			:data="tableData"
			v-loading="tableLoading"
			@selection-change="handleSelectionChange"
			max-height="621"
			>
			<el-table-column property="id" label="角色名"  show-overflow-tooltip/>
			<el-table-column property="permissionList" label="权限" show-overflow-tooltip>
				<template #default="scope">
					<div style="display: inline-block">

					<el-select
						v-model="tableData[scope.$index].permissionList"
						multiple
						collapse-tags
						filterable
						placeholder="选择权限"
						:loading="permissionsLoading"
						@visible-change="(flag) => loadPermissions(flag, scope.$index)"
						@change="updateRole(scope.$index)"
					>
						<el-option
							v-for="item in permissionsRemote"
							:key="item.key"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
					</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-tooltip content="删除" effect="light" show-after=1000>
						<el-button type="text" style="color:#f89898" @click.stop="deleteBox(scope.$index)">
							<el-icon><i-ep-delete /></el-icon>
						</el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
		<div class="page-box">
			<el-pagination 
				layout="prev, pager, next" 
				:total="page.total" 
				:page-size="page.size"
				v-model:currentPage="page.current"
				@update:currentPage="getTableData()"></el-pagination>
		</div>
	</div>
	<RoleEditForm  @updated="getTableData" :formVisible="createFormVisible"/>

</template>
<style scoped>
.user-table-box {
	display: flex;
    flex-direction: column;
	height: 100%;
	margin: 0 20px;
}
.page-box {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
.button-top-box {
	display: flex;
	justify-content: space-between;
}
.button-right-box {
	display: flex;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.input-with-select {
	margin-left: 10px;
}
.el-table{
	width:100%;
	flex-grow: 1;
}
</style>