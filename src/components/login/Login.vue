<script setup>
	import { reactive, ref } from 'vue';
	import { useRouter } from 'vue-router';
	const router = useRouter()

	function toForget() {
		router.push('/forget')
	}
	function toRegister() {
		router.push('/register')
	}
	const loginEntity = reactive({
		username: "",
		password: "",
		rememberMe: false,
	})
	const isLoading = ref(false)
	const rules = reactive({
		username: [
			{
				required: true,
				message: 'Please input Activity name',
				trigger: 'blur',
			},
			{
				min: 3,
				max: 20,
				message: 'Length should be 3 to 20',
				trigger: 'blur',
			},
		],
		password: [
			{
				required: true,
				message: 'Please input Activity name',
				trigger: 'blur',
			},
			{
				min: 8,
				max: 128,
				message: 'Length should be 8 ',
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
				<!-- <router-link class="el-link" to="/forget"></router-link> -->
			</div>
		</el-form-item>
		<div class="button-box">
			<el-button :loading="isLoading" type="primary">登录</el-button>
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
