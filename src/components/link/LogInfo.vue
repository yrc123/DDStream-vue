<script setup>
	import { computed, defineProps, reactive, ref, watch, watchEffect } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'

	const props = defineProps({
		formVisible: {
			type: Object,
		},
		clientId: {
			type: String,
		},
		name: {
			type: String
		}
	})
	const data = ref("")
	const visible = props.formVisible
	watch(visible, (newValue, oldValue) => {
		if (newValue.flag == true) {
			isLoading.value = true
			data.value = "无日志"
			getData()
		}
	},{
		flush: "post",
	})
	function getData() {
		service.getProcessLog({clientId: props.clientId, name: props.name})
			.then((res) => {
				if (res.data) {
					data.value = res.data
				}
				isLoading.value = false
			})
	}
	function refresh() {
		isLoading.value = true
		getData()
	}
	const isLoading = ref(true)
</script>
<template>
	<el-dialog 
		v-model="props.formVisible.flag" 
		title="程序日志"
		width="70%"
	>
		<el-scrollbar max-height="500px" v-loading="isLoading">
			<div class="log-box">
				<el-button circle  @click.stop="refresh" class="refresh">
					<el-icon><i-ep-refresh /></el-icon>
				</el-button>
				{{ data }}
			</div>
		</el-scrollbar>
	</el-dialog>

</template>
<style scoped>
.log-box {
	text-align: left;
    background-color: #303133;
    color: #CCCCCC;
    padding: 20px 20px;
    white-space: pre-line;
	border-radius: 4px;
}
.refresh {
	position: absolute;
    right: 20px;
	top: 10px;
	opacity: 0.1;
	transition: 0.3s ease;
}
.refresh:hover {
	opacity: 1;
}
</style>