<script setup>
// This starter template is using Vue 3 <script setup> SFCs
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue'
</script>

<template>
    <el-container style="height: 100vh;">
		<el-header>
			<Header/>
		</el-header>
		<el-container style="overflow:hidden">
			<el-aside :span="3">
				 <SideBar />
			</el-aside>
			<el-container>
				<el-scrollbar>
					<el-main>Main
					<div style="height:1000px"></div>
				</el-main>
				</el-scrollbar>
				
				<el-footer>Footer</el-footer>
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
