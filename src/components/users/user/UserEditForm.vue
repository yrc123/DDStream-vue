<script setup>
	import { defineProps, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'

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
	watch(visible, (newValue, oldValue) => {
		if (newValue.flag == true) {
			if(props.type == "create") {
				data.value = {
					id: "",
					username: "",
					password: "",
					nickname: "",
					email: "",
					roleList:[],
				}	
				title.value = "创建用户"
				isUpdate.value = false
			} else if(props.type == "update") {
				data.value = reactive(_.clone(props.user))
				data.value.password = null 
				title.value = "修改用户"
				isUpdate.value = true
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
					service.addUser(data)
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
	const rules = reactive({
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
		note : [
			{
				required: true,
				message: '内容不得为空',
				trigger: 'blur',
			},
			{
				min: 1,
				max: 128,
				message: '长度应大于 128',
				trigger: 'blur',
			},
		],
	})
</script>
<template>
	<el-dialog 
		v-model="props.formVisible.flag" 
		:title="title"
		>
		<el-form 
			ref="formRef" 
			:model="data" 
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
			<el-form-item prop="password" label="密码" >
				<el-input 
					type="password" 
					show-password
					placeholder="保持不变"
					v-model="data.password" />
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