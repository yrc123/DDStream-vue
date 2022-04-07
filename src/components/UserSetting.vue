<script setup>
	import { defineProps, onMounted, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'
	import md5 from "js-md5"

	const props = defineProps({
		formVisible: {
			type: Object,
		},
	})
	const data = ref({})
	const isUpdate = ref()
	const visible = props.formVisible
	const dialogLoading = ref(true)
	watch(visible, (newValue, oldValue) => {
		if (newValue.flag == true) {
			dialogLoading.value = true
			service.getInfo()
				.then((res) => {
					data.value = res.data
				dialogLoading.value = false
				})
		}
	},{
		flush: "post",
	})
	const emits = defineEmits(['updated'])
	const formRef = ref()
	const isLoading = ref(false)

	function submit(formRef, data) {
		if (!formRef) return
		formRef.validate((valid) => {
			if (valid) {
				isLoading.value = true
				if (data.showPassword != null) {
					data.password = md5(data.showPassword)
				}
				service.setting(data)
					.then((res) => {
						Message.success("提交成功")
						props.formVisible.flag = false
						emits('updated')
					})
					.finally(() => {
						isLoading.value = false
					})
			} else {
				return false
			}
		})
	}
	const rules = ref({
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
	<el-dialog 
		v-model="props.formVisible.flag" 
		title="修改信息"
		>
		<el-form 
			ref="formRef" 
			:model="data" 
			:rules="rules"
			label-position="left"
			label-width="auto"
			v-loading="dialogLoading"
			>
			<el-form-item prop="username"  label="用户名">
				<el-input v-model="data.username" disabled />
			</el-form-item>
			<el-form-item prop="nickname" label="昵称">
				<el-input v-model="data.nickname" />
			</el-form-item>
			<el-form-item prop="showPassword" label="密码" >
				<el-input 
					type="password" 
					show-password
					placeholder="保持不变"
					v-model="data.showPassword" />
			</el-form-item>
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="data.email" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="props.formVisible.flag = false">取消</el-button>
				<el-button type="primary" :loading="isLoading" @click="submit(formRef, data)">提交</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<style scoped>

</style>