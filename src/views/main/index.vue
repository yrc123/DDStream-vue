<script setup>
import { ref } from "@vue/reactivity";

	const isLoading = ref(true)
</script>

<template>
    <el-container style="height: 100vh;">
		<el-header>
			<Header/>
		</el-header>
		<el-container style="overflow:hidden">
			<el-aside :span="3">
				 <SideBar/>
			</el-aside>
			<el-container>
				<el-scrollbar class="main-scrollbar" view-class="scrollbar-view">
					<el-main v-loading="isLoading">
						<router-view @after-loaded="isLoading = false" @before-loaded="isLoading = true"></router-view>
					</el-main>
					<el-divider></el-divider>
					<el-footer>Footer</el-footer>
				</el-scrollbar>
			</el-container>
		</el-container>
	</el-container>
</template>

<style scoped>
.el-header{
	padding:0
}
.el-main {
	flex-grow: 1;
    flex-shrink: 0;
}
.main-scrollbar {
	width: 100%;
}
.main-scrollbar >>> .scrollbar-view {
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>
<style>
</style>
