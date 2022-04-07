<script setup>
	import { computed, defineProps, reactive, ref, watch, watchEffect } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'

	const props = defineProps({
		formVisible: {
			type: Object,
		},
		linkId: {
			type: String
		}
	})
	const data = ref([])
	const visible = props.formVisible
	const timer = ref()
	const scrollbarRef = ref()
	watch(visible, (newValue, oldValue) => {
		if (newValue.flag == true) {
			isLoading.value = true
			data.value = []
			getData()
			timer.value = setInterval(() => {
				getData()
			}, 1000)
		}
	},{
		flush: "post",
	})
	function getData() {
		service.getFFmpegLinkStatus({id: props.linkId})
			.then((res) => {
				data.value = res.data
				data.value.forEach((value, index) => {
					value.title = '推流节点 ' + index
				})
				isLoading.value = false
				scrollbarRef.value.update()
			})

	}
	const emits = defineEmits(['getLog'])
	const isLoading = ref(true)
	const active = computed(() => {
		for (let i = 0; i < data.value.length; i++) {
			if (data.value[i].processAlive == false) {
				return i
			}
		}
		return data.value.length
	})
	watchEffect(() => {
		let firstFlag = false
		data.value.forEach((value, index) => {
			if (value.processAlive == false) {
				if (firstFlag == false) {
					if (value.reason) {
						value.status = "error"
						value.description = value.reason
					} else {
						value.status = "process"
					}
					firstFlag = true
				}
			}
		})
	})
	function onDialogClose() {
		clearInterval(timer.value)
	}
</script>
<template>
	<el-dialog 
		v-model="props.formVisible.flag" 
		title="链路状态"
		@close="onDialogClose"
		>
		<el-scrollbar ref="scrollbarRef">
			<div class="step-box" v-loading="isLoading">
					<el-steps :active="active" finish-status="success" :space="130">
						<el-step v-for="(item, index) in data"
							finish-status="success"
							:key="index"
							:status="item.status"
							:description="item.description"
							class="step-box"
						>
							<template #title>
								{{ item.title }}
								<el-button class="log-button" type="text" @click.stop="emits('getLog',{clientId: item.id, name: item.name})">
									<el-icon><i-clarity-align-left-text-line /></el-icon>
								</el-button>
							</template>
						</el-step>
					</el-steps>
			</div>
		</el-scrollbar>
	</el-dialog>

</template>
<style scoped>
.step-box {
	text-align: left;
}
.log-button {
	font-size: 16px;
}
.log-button svg {
	position: absolute;
    bottom: 1px;
}
.step-box {
	flex-shrink: 0;
	max-width: 100% !important;
}
.el-steps {
    height: 80px;
}
</style>