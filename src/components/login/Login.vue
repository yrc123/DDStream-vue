<script setup>
	import { reactive, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import service from 'apis/api'
	import { paths } from '@/router/index'
	import Message from "js/Message";
	import instance from "apis/index";

	const router = useRouter()
	const formRef = ref()
	const isLoading = ref(false)

	function toForget() {
		router.push(paths.forget)
	}
	function toRegister() {
		router.push(paths.register)
	}
	const loginEntity = reactive({
		username: "",
		password: "",
		rememberMe: false,
	})
	function submit(formRef, data) {
		if (!formRef) return
		formRef.validate((valid) => {
			if (valid) {
				isLoading.value = true
				//TODO: 加密密码
				service.login(data)
					.then((res) => {
						Message.success("登录成功", () => router.back())
						if (loginEntity.rememberMe) {
							localStorage.setItem("satoken", res.data)
						} else {
							sessionStorage.setItem("satoken", res.data)
						}
					})
					.catch(() => {
						isLoading.value = false
					})
			} else {
				return false
			}
		})
	}
	const rules = reactive({
		username: [
			{
				required: true,
				message: '内容不得为空',
				trigger: 'blur',
			},
			{
				min: 3,
				max: 20,
				message: '长度应为 3 到 20',
				trigger: 'blur',
			},
		],
		password: [
			{
				required: true,
				message: '内容不得为空',
				trigger: 'blur',
			},
			{
				min: 8,
				max: 128,
				message: '长度应大于 8',
				trigger: 'blur',
			},
		],
	})
</script>
<template>
	<el-form 
		ref="formRef" 
		:model="loginEntity" 
		:rules="rules"
		label-width="120px" 
		label-position="top"
		>
		<el-form-item prop="username" label="用户名">
			<el-input v-model="loginEntity.username" clearable />
		</el-form-item>
		<el-form-item prop="password" label="密码">
			<el-input v-model="loginEntity.password" show-password />
		</el-form-item>
		<el-form-item>
			<div class="remember-box">
				<el-switch
					active-text="记住我"
					v-model="loginEntity.rememberMe"
				>
				</el-switch>
				<el-link @click="toForget">忘记密码</el-link>
			</div>
		</el-form-item>
		<div class="button-box">
			<el-button @click="submit(formRef, loginEntity)" :loading="isLoading" type="primary">登录</el-button>
			<el-button @click="toRegister">注册</el-button>
		</div>
	</el-form>
</template>
<style scoped>
#login-box {
	display: flex;
}
.button-box {
	display: flex;
}
.button-box>.el-button {
	flex-grow: 1;
}
.remember-box {
	display: flex;
	width: 100%;
	justify-content:space-between;
}
</style>
