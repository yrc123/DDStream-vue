<script setup>
	import { ref } from "@vue/reactivity";
	import homePic from "assets/home.svg"
	import { useRouter } from 'vue-router';

	const isLoading = ref(true)
	const router = useRouter()
</script>

<template>
    <el-container style="height: 100vh;">
		<el-header>
			<Header/>
		</el-header>
		<el-container style="overflow:hidden">
			<el-container>
					<el-main>
						<div class="home-title">
							{{ "无需等待   轻松推流" }}
						</div>
						<el-image class="home-picture" :src="homePic" :fit="fit" />
						<el-button @click="router.push('/console/servers')" class="home-button" size="large" type="primary">进入系统</el-button>
					</el-main>
					<el-divider></el-divider>
					<el-footer><Footer /></el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<style scoped>
.el-header{
	padding:0;
	border-bottom: solid 1px var(--el-border-color);
}
.el-main {
	flex-grow: 1;
    flex-shrink: 0;
}
.home-title {
	font-size: 40px;
	margin: 30px 0;
    white-space: pre-wrap;
}
.home-picture {
    display: block;
    width: 700px;
    margin: 100px auto;
    margin-bottom: 40px;
}
.home-button {

}
</style>
