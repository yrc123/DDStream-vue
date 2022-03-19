<script setup>
	import { defineProps, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'
	import md5 from "js-md5"

	const props = defineProps({
		user: {
			type: Object,
		},
		formVisible: {
			type: Object,
		},
		type: {
			type: String,
		}
	})
	const data = ref({})
	const title = ref("")
	const isUpdate = ref()
	const visible = props.formVisible
	const passwordPlaceholder = ref()
	watch(visible, (newValue, oldValue) => {
		if (newValue.flag == true) {
			if(props.type == "create") {
				data.value = {
					id: "",
					username: "",
					password: "",
					showPassword: "",
					nickname: "",
					email: "",
					roleList:[],
				}	
				title.value = "创建用户"
				isUpdate.value = false
				rules.value = insertRule 
				passwordPlaceholder.value = ""
				
			} else if(props.type == "update") {
				data.value = reactive(_.clone(props.user))
				data.value.password = null 
				data.value.showPassword = null
				title.value = "修改用户"
				isUpdate.value = true
				rules.value = updateRule 
				passwordPlaceholder.value = "保持不变"
			}
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
				if (isUpdate.value) {
					if (data.showPassword != null) {
						data.password = md5(data.showPassword)
					}
					service.updateUser(data)
						.then((res) => {
							Message.success("提交成功")
							props.formVisible.flag = false
							emits('updated')
						})
						.finally(() => {
							isLoading.value = false
						})
				} else {
					data.password = md5(data.showPassword)
					service.insertUser(data)
						.then((res) => {
							Message.success("提交成功")
							props.formVisible.flag = false
							emits('updated')
						})
						.finally(() => {
							isLoading.value = false
						})
				}
			} else {
				return false
			}
		})
	}
	const rules = ref()
	const insertRule = {
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
	}
	const updateRule = {
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
	}

</script>
<template>
	<el-dialog 
		v-model="props.formVisible.flag" 
		:title="title"
		>
		<el-form 
			ref="formRef" 
			:model="data" 
			:rules="rules"
			label-position="left"
			label-width="auto"
			>
			<el-form-item prop="id" label="id">
				<el-input v-model="data.id" disabled />
			</el-form-item>
			<el-form-item prop="username" label="用户名">
				<el-input v-model="data.username" :disabled="isUpdate" />
			</el-form-item>
			<el-form-item prop="nickname" label="昵称">
				<el-input v-model="data.nickname" />
			</el-form-item>
			<el-form-item prop="showPassword" label="密码" >
				<el-input 
					type="password" 
					show-password
					:placeholder="passwordPlaceholder"
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