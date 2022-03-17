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
	const updateFormVisible = reactive({
		flag:false
	})
	const searchCondition = reactive({
		searchSelect:"",
		searchInput:"",
	})
	const editUser = ref({})
	function editBox(index) {
		editUser.value = tableData.value[index]
		updateFormVisible.flag = true
	}
	function deleteBox(index) {
		openConfirmBox("确认删除用户？",()=>{
			service.deleteUser({
				userId: tableData.value[index].id
			}).then((res) => {
				Message.success("删除成功")
				getTableData()
			})
		})
	}
	const deleteMultiBox = () => {
		openConfirmBox("确认删除选中用户？",()=>{
			service.deleteUsers(multipleSelection.value)
				.then((res) => {
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
		service.searchUsers(postData)
			.then((res) => {
				tableLoading.value = false
				tableData.value = res.data.records
				page.total = res.data.total
			})
	}
	const rolesRemote = ref([])
	const rolesLoading = ref(true)
	function loadRoles(flag, index) {
		if (flag == true) {
			if (rolesRemote.value.length == 0) {
				rolesLoading.value = true
				service.listRoles()
					.then((res) => {
						rolesRemote.value = res.data
							.map((value, index) => {
								return {
									key: index,
									value: value.id,
									label: value.id,
								}
							})
							rolesLoading.value = false
					})
			}
		}
	}
	const updateUser = _.debounce((index) => {
			service.updateUser(tableData.value[index])
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
	const multipleSelection = ref([])
	const handleSelectionChange = (val) => {
		multipleSelection.value = val
	}
	const hasSelected = computed(() => {
		return multipleSelection.value.length != 0
	})
	onMounted(() => {
		getTableData()
		loadRoles(true)
	})

</script>
<template>
	<div class="user-table-box">
		<div class="button-top-box">
			<div class="button-left-box">
				<el-button type="primary" plain @click="createFormVisible.flag = true">添加用户</el-button>
				<el-button type="danger" plain @click="deleteMultiBox" :disabled="!hasSelected">删除选中</el-button>
			</div>
			<div class="button-right-box">
				<el-button circle @click="getTableData">
					<el-icon ><i-ep-refresh-right /></el-icon>
				</el-button>
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
							<el-option label="用户id" value="id"></el-option>
							<el-option label="用户名" value="username"></el-option>
							<el-option label="昵称" value="nickname"></el-option>
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
			<el-table-column type="selection" width="55" />
			<el-table-column property="id" label="用户id"  show-overflow-tooltip/>
			<el-table-column property="username" label="用户名" show-overflow-tooltip/>
			<el-table-column property="nickname" label="昵称" show-overflow-tooltip />
			<el-table-column property="email" label="邮箱" show-overflow-tooltip />
			<el-table-column property="roleList" label="角色" show-overflow-tooltip>
				<template #default="scope">
					<el-select
						v-model="tableData[scope.$index].roleList"
						multiple
						collapse-tags
						filterable
						placeholder="选择角色"
						:loading="rolesLoading"
						@visible-change="(flag) => loadRoles(flag, scope.$index)"
						@change="updateUser(scope.$index)"
					>
						<el-option
							v-for="item in rolesRemote"
							:key="item.key"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-button type="text" @click.stop="editBox(scope.$index)">
						<el-icon><i-ep-edit /></el-icon>
					</el-button>
					<el-button type="text" style="color:#f89898" @click.stop="deleteBox(scope.$index)">
						<el-icon><i-ep-delete /></el-icon>
					</el-button>
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
	<UserEditForm type="create" @updated="getTableData" :formVisible="createFormVisible"/>
	<UserEditForm type="update" @updated="getTableData" :user="editUser" :formVisible="updateFormVisible"/>

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