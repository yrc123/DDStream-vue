<script setup>
	import { computed, onMounted, reactive, ref } from 'vue'
	import { ElTable } from 'element-plus'
	import { openConfirmBox } from "js/common"
	import service from 'apis/api'
	import Message from 'js/Message'
	import { useRouter } from 'vue-router'
	import _ from 'lodash'

	const emits = defineEmits(['beforeLoaded','afterLoaded'])
	emits('beforeLoaded')
	emits('afterLoaded')
	const tableData = ref([])
	const tableLoading = ref(true)
	const router = useRouter()
	const page = reactive({
		current: 1,
		size: 15,
		total: 0,
	})
	const searchCondition = reactive({
		searchSelect:"",
		searchInput:"",
	})
	const linkInfoVisible = reactive({
		flag:false
	})
	const logInfoVisible = reactive({
		flag:false
	})
	// <LogInfo :formVisible="logInfoVisible" :clientId="showClientId" :name="showName"/>
	const showLinkId = ref("")
	const showClientId = ref("")
	const showName = ref("")
	function editLink(index) {
		router.push({
			name: 'linksEdit',
			params: {
				id: tableData.value[index].id
			}
		})
	}
	function startPush(index) {
		openConfirmBox("确认启动推流？",()=>{
			service.startFFmpegLink({id: tableData.value[index].id})
				.then((res) => {
					Message.info("开始推流")
					linkInfoVisible.flag = true
					showLinkId.value = tableData.value[index].id
				})
		})
	}
	function stopPush(index) {
		openConfirmBox("确认停止推流？",()=>{
			service.stopFFmpegLink({id: tableData.value[index].id})
				.then((res) => {
					Message.success("停止推流")
					linkInfoVisible.flag = true
					showLinkId.value = tableData.value[index].id
				})
		})
	}
	function showLinkStatus(index) {
		showLinkId.value = tableData.value[index].id
		linkInfoVisible.flag = true
	}
	function showLogInfo(client) {
		showClientId.value = client.clientId
		showName.value = client.name
		logInfoVisible.flag = true
	}
	function deleteBox(index) {
		openConfirmBox("确认删除链路？",()=>{
			service.deleteFFmpegLink({
				id: tableData.value[index].id
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
		service.searchFFmpegLink(postData)
			.then((res) => {
				tableLoading.value = false
				tableData.value = res.data.records
				page.total = res.data.total
			})
	}
	function searchClear() {
		searchCondition.searchInput = ""
		searchCondition.searchSelect = ""
		getTableData()
	}
	onMounted(() => {
		getTableData()
	})

</script>
<template>
	<div class="user-table-box">
		<div class="button-top-box">
			<div class="button-left-box">
				<el-button type="primary" plain @click="$router.push({name: 'linksAdd'})">添加链路</el-button>
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
							<el-option label="任务id" value="id"></el-option>
							<el-option label="任务名" value="name"></el-option>
						</el-select>
					</template>
					<template #append>
						<el-tooltip content="刷新" effect="light" :show-after="1000">
							<el-button @click="getTableData">
								<el-icon><i-ep-search /></el-icon>
							</el-button>
						</el-tooltip>
					</template>
				</el-input>
			</div>
		</div>
		<el-divider></el-divider>
		<el-table
			ref="multipleTableRef"
			:data="tableData"
			v-loading="tableLoading"
			max-height="621"
			>
			<el-table-column property="id" label="任务id"  show-overflow-tooltip/>
			<el-table-column property="name" label="任务名" show-overflow-tooltip/>
			<el-table-column label="创建时间"  show-overflow-tooltip>
				<template #default="scope">
					{{ new Date(scope.row.createTime).toLocaleString() }}
				</template>
			</el-table-column>
			<el-table-column label="修改时间"  show-overflow-tooltip>
				<template #default="scope">
					{{ new Date(scope.row.updateTime).toLocaleString() }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="160">
				<template #default="scope">
					<el-tooltip content="启动" effect="light" :show-after="1000">
						<el-button type="text" @click.stop="startPush(scope.$index)">
							<el-icon><i-ep-video-play /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="停止" effect="light" :show-after="1000">
						<el-button type="text" style="color:#f89898" @click.stop="stopPush(scope.$index)">
							<el-icon><i-ep-video-pause /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="详情" effect="light" :show-after="1000">
						<el-button type="text" @click.stop="showLinkStatus(scope.$index)">
							<el-icon><i-ep-view /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="编辑" effect="light" :show-after="1000">
						<el-button type="text" @click.stop="editLink(scope.$index)">
							<el-icon><i-ep-edit /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="删除" effect="light" :show-after="1000">
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
	<LinkInfo :formVisible="linkInfoVisible" :linkId="showLinkId" @getLog="showLogInfo($event)"/>
	<LogInfo :formVisible="logInfoVisible" :clientId="showClientId" :name="showName"/>
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