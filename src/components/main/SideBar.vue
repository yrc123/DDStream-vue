<script setup>
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router';
	const route = useRoute()
</script>

<template>
    <el-scrollbar class="scrollbar" style="">
		<el-menu :router=true style="border-right:none;">
			<el-menu-item index="/console">
				<el-icon><i-ep-compass /></el-icon>首页
			</el-menu-item>
			<el-menu-item index="/console/servers">
				<el-icon><i-clarity-nodes-line /></el-icon>服务
			</el-menu-item>
			<el-menu-item index="/console/links">
				<el-icon><i-ep-link /></el-icon>链路
			</el-menu-item>
			<el-sub-menu index="1">
				<template #title>
					<el-icon><i-ep-user /></el-icon>用户
				</template>
				<el-menu-item index="/console/roles">
					<el-icon><i-ep-lock /></el-icon>角色
				</el-menu-item>
				<el-menu-item index="/console/users">
					<el-icon><i-ep-user-filled /></el-icon>用户信息
				</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="/console/files">
				<el-icon><i-ep-files /></el-icon>文件
			</el-menu-item>
			<el-menu-item index="/console/setting">
				<el-icon><i-ep-setting /></el-icon>设置
			</el-menu-item>
        </el-menu>
	</el-scrollbar>
</template>

<style scoped>
.scrollbar {
	border-right: solid 1px #e6e6e6;
}

</style>

