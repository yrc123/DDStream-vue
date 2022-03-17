<script setup>
	import { defineProps, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'

	const props = defineProps({
		formVisible: {
			type: Object,
		}
	})
	const data = ref({})
	const visible = props.formVisible
	watch(visible, (newValue, oldValue) => {
		if (newValue.flag == true) {
			data.value = {
				id: "",
				permissionList:[],
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
				service.insertRole(data)
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
	const rules = reactive({
		id: [
			{
				required: true,
				message: '内容不得为空',
				trigger: 'blur',
			},
			{
				min: 1,
				max: 64,
				message: '长度应为 1 到 64',
				trigger: 'blur',
			},
		],
	})
</script>
<template>
	<el-dialog 
		v-model="props.formVisible.flag" 
		title="添加角色"
		>
		<el-form 
			ref="formRef" 
			:model="data" 
			:rules="rules"
			label-position="left"
			label-width="auto"
			>
			<el-form-item prop="id" label="角色名">
				<el-input v-model="data.id" />
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