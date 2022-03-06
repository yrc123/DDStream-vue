<script setup>
	import { reactive, ref } from 'vue';
	import user from "assets/default-user.png"
	import Typewriter from "components/Typewriter.vue"
	const typeTexts = ref([
		'hello world!!!',
	])
</script>
<template>
	<div class="login-body">
		<el-card class="login-box">
			<p class="login-title">用户登录</p>
			<el-avatar :size="70" :src="user"></el-avatar>
			<div class="login-text">
				<Typewriter :typeTexts="typeTexts"></Typewriter>
			</div>
			<el-divider></el-divider>
			<div style="width: 400px">
				<Login />
			</div>
		</el-card>
	</div>
</template>
<style scoped>
.large-radius {
	border: 1px solid var(--el-border-color-base);
	border-radius: var(--el-border-radius-base);
}
.login-box {
	padding: 25px 30px 70px 30px;
}
.login-text {
	font-size: 15px;
	color: #909399;
}
.login-title {
    font-size: 25px;
    letter-spacing: 3px;
}
.login-body {
    display: flex;
    flex-direction: column;
    align-items: center;
	height: 100vh;
	justify-content: center;
	background-color:   #f4f4f5;
}
</style>