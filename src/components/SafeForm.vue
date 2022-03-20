<script setup>
	import { defineProps, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'
	import { useRouter } from 'vue-router';
	import md5 from "js-md5"

	const data = ref({
		showPassword: "",
		password: "",
	})
	const isLoading = ref(false)
	const formRef = ref({})
	const router = useRouter()

	function submit(formRef, data) {
		if (!formRef) return
		formRef.validate((valid) => {
			if (valid) {
				isLoading.value = true
				data.password = md5(data.showPassword)
				service.safe(data)
					.then((res) => {
						Message.success("验证成功",() => {
							router.back()
						})
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
	})
</script>
<template>
	<el-form 
		ref="formRef" 
		:model="data" 
		:rules="rules"
		label-position="top"
		label-width="auto"
		>
		<el-form-item prop="showPassword" label="密码">
			<el-input type="password" show-password v-model="data.showPassword" />
		</el-form-item>
		<div class="button-box">
			<el-button type="primary" :loading="isLoading" @click="submit(formRef, data)">提交</el-button>
		</div>
	</el-form>
</template>
<style scoped>
.button-box {
	display: flex;
}
.el-button {
	flex-grow: 1;
}

</style>