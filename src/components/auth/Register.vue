<script setup>
	import { reactive, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import service from 'apis/api'
	import Message from "js/Message";
	import instance from "apis/index";
	import md5 from "js-md5"

	const router = useRouter()
	const formRef = ref()
	const isLoading = ref(false)
	const emits = defineEmits(["changePage"])

	function toForget() {
		router.push({name: 'forget'})
	}
	function toRegister() {
		router.push({name: 'register'})
	}
	const userEntity = reactive({
		username: "",
		password: "",
		showPassword: "",
		nickname: "",
		email: "",
		roleList: [],
	})
	function submit(formRef, data) {
		if (!formRef) return
		formRef.validate((valid) => {
			if (valid) {
				isLoading.value = true
				if (data.showPassword != null) {
					data.password = md5(data.showPassword)
				}
				service.register(data)
					.then((res) => {
						Message.success("注册成功", () => router.back())
						localStorage.setItem("satoken", res.data)
					})
					.finally(() => {
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
		showPassword: [
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
		nickname: [
			{
				required: true,
				message: '内容不得为空',
				trigger: 'blur',
			},
			{
				min: 1,
				max: 16,
				message: '长度应为 1 到 16',
				trigger: 'blur',
			},
		],
		email: [
			{
				type: 'email'
			}
		],
	})
</script>
<template>
	<el-form 
		ref="formRef" 
		:model="userEntity" 
		:rules="rules"
		label-width="120px" 
		label-position="top"
		>
		<el-form-item prop="username" label="用户名">
			<el-input v-model="userEntity.username" clearable />
		</el-form-item>
		<el-form-item prop="showPassword" label="密码">
			<el-input v-model="userEntity.showPassword" show-password />
		</el-form-item>
		<el-form-item prop="nickname" label="昵称">
			<el-input v-model="userEntity.nickname" clearable />
		</el-form-item>
		<el-form-item prop="email" label="邮箱">
			<el-input v-model="userEntity.email" clearable />
		</el-form-item>
		<div class="button-box">
			<el-button @click="emits('changePage')" :loading="isLoading" >登录</el-button>
			<el-button @click="submit(formRef, userEntity)" type="primary">注册</el-button>
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
