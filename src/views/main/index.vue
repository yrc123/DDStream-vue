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
.el-header {
  position: relative;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}

</style>
