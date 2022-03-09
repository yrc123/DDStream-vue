<script setup>
	import { defineProps, reactive, ref } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'

	const props = defineProps({
		client: {
			type: Object,
		},
		formVisible: {
			type: Object,
		},
	})
	const emits = defineEmits(['updated'])
	const formRef = ref()
	const isLoading = ref(false)
	const client = reactive(_.clone(props.client))

	function submit(formRef, data) {
		if (!formRef) return
		formRef.validate((valid) => {
			if (valid) {
				isLoading.value = true
				service.updateClient(data)
					.then((res) => {
						Message.success("修改成功")
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
	<el-dialog v-model="props.formVisible.flag" title="编辑服务器">
		<el-form 
			ref="formRef" 
			:model="client" 
			:rules="rules"
			label-position="left"
			label-width="auto"
			>
			<el-form-item prop="id" label="id">
				<el-input v-model="client.id" disabled />
			</el-form-item>
			<el-form-item prop="hostname" label="地址">
				<el-input v-model="client.hostname" disabled />
			</el-form-item>
			<el-form-item prop="port" label="端口">
				<el-input v-model="client.port" disabled />
			</el-form-item>
			<el-form-item prop="nickname" label="主机名">
				<el-input v-model="client.nickname" />
			</el-form-item>
			<el-form-item prop="note" label="备注">
				<el-input v-model="client.note" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="props.formVisible.flag = false">取消</el-button>
				<el-button type="primary" :loading="isLoading" @click="submit(formRef, client)">提交</el-button>
			</span>
		</template>
	</el-dialog>

</template>
<style scoped>

</style>