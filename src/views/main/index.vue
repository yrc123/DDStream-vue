<script setup>
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
				<el-scrollbar style="width: 100%;">
					<el-main>
						<router-view></router-view>
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
    min-height: calc(100vh - 160px);
}
</style>
