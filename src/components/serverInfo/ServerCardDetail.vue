<script setup>
import { onScopeDispose, reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import service from 'apis/api'

	const props = defineProps({
		clientId: {
			type: String
		}
	})
	const detailLoading = ref(true)
	class Item {
		constructor(max, used, tip, showUnit) {
			this.max = max
			this.used = used
			this.tip = tip
			this.showUnit = showUnit
			if (showUnit) {
				this.unit = 1024
			} else {
				this.unit = 1
			}
		}
	}
	const detailData = reactive([
		new Item(
			1,
			0,
			"磁盘使用量",
			true
		),
		new Item(
			1,
			0,
			"Jvm内存使用量",
			true
		),
		new Item(
			1,
			0,
			"进程Cpu使用量",
			false
		),
		new Item(
			1,
			0,
			"总Cpu使用量",
			false
		),

	])
	var interval
	function getDetailData(res, detailDataList) {
		const data = res.data
		const diskSpace = data.healthDto.components.diskSpace.details
		detailDataList[0].max = diskSpace.total
		detailDataList[0].used = diskSpace.total - diskSpace.free
		detailDataList[1].max = data.jvmMemoryMax.measurements[0].value
		detailDataList[1].used = data.jvmMemoryUsed.measurements[0].value
		detailDataList[2].max = 1
		detailDataList[2].used = data.processCpuUsage.measurements[0].value
		detailDataList[3].max = 1
		detailDataList[3].used = data.systemCpuUsage.measurements[0].value
	}
	onMounted(() => {
		// 第一次获取
		service.getClientActuator({clientId: props.clientId})
			.then((res) => {
				detailLoading.value = false
				getDetailData(res, detailData)
			})
		//定时获取
		interval = setInterval(() => {
			service.getClientActuator({clientId: props.clientId})
				.then((res) => {
					detailLoading.value = false
					getDetailData(res, detailData)
				}).catch((reason) => {
					clearInterval(interval)
				})
		}, 5000)
	})
	onScopeDispose(() => {
		clearInterval(interval)
	})
</script>
<template>

	<div class="progress-box" v-loading="detailLoading" >

		<template v-for="item in detailData" :key="item.tip">
			<el-popover
				placement="bottom"
				:width="200"
				trigger="hover"
			>
				<template #reference>
					<el-progress type="dashboard" :percentage="Math.round((item.used / item.max) * 100)">
						<template #default="{ percentage }">
							<span class="percentage-value">{{ percentage }}%</span>
							<span class="percentage-label">{{ item.tip }}</span>
						</template>
					</el-progress>
				</template>
				<div style="font-size:20px">使用详情</div>
				<div v-if="item.showUnit">
					<el-radio-group 
						v-model="item.unit" 
						style="margin-bottom: 10px;margin-top: 5px" 
						size="small"
						>
						<el-radio-button label=1024>KB</el-radio-button>
						<el-radio-button label=1048576>MB</el-radio-button>
						<el-radio-button label=1073741824>GB</el-radio-button>
					</el-radio-group>
				</div>
				<div>
					<div>已使用: {{ (item.used / item.unit).toFixed(2) }}</div>
					<div>未使用: {{ ((item.max - item.used) / item.unit).toFixed(2) }}</div>
					<div>总大小: {{ (item.max / item.unit).toFixed(2) }}</div>
				</div>
			</el-popover>

		</template>
	</div>
	
</template>
<style scoped>
.progress-box {
	display: flex;
	justify-content: space-around;
	height: 100%;
}
.percentage-label {
	display: block;
	margin-top: 10px;
	font-size: 12px;
}
.percentage-value {
	display: block;
	margin-top: 10px;
	font-size: 28px;
}
</style>