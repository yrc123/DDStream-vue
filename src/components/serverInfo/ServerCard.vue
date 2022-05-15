<script setup>
import { markRaw, reactive, ref, shallowRef } from "@vue/reactivity";
import { watch } from "vue";
import { computed } from "@vue/runtime-core";
import { openConfirmBox } from "js/common"
import ServerCardInfo from "./ServerCardInfo.vue";
import ServerCardDetail from "./ServerCardDetail.vue"
import ServerEditForm from "./ServerEditForm.vue";
import service from 'apis/api'

	const props = defineProps({
		client:{
			type: Object
		}
	})

	const emits = defineEmits(['updated', 'refresh'])
	const notDetail = ref(true)
	const cardClass = reactive({
		'not-detail-box': notDetail,
	})
	const up = props.client.up
	function changeCardMode() {
		if (props.client.up) {
			notDetail.value = !notDetail.value
		} else {
			notDetail.value = true
		}
	}
	const formVisible = reactive({
		flag: false
	})
	const confirmBox = (id) => {
		openConfirmBox("确认删除？相关记录将会被级联删除！",()=>{
			emits('updated')
			service.deleteClient({clientId: id})
		})
	}
	watch(() => props.client.up, (newValue, oldValue) => {
		if (newValue == false && notDetail.value == false) {
			changeCardMode()
		}
	})
</script>
<template>
	<el-card class="detail-box" body-style="display: flex" :class="cardClass" @click="changeCardMode">
		<template #header>
			<div class="card-header">
				<span>{{ client.id }}</span>
				<div class="button-box">
					<el-tooltip content="刷新" effect="light" :show-after="1000">
						<el-button type="primary" circle plain @click.stop="emits('refresh')">
							<el-icon ><i-ep-refresh-right /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="编辑" effect="light" :show-after="1000">
						<el-button type="primary" circle plain @click.stop="formVisible.flag = true">
							<el-icon><i-ep-edit /></el-icon>
						</el-button>
					</el-tooltip>
					<el-tooltip content="删除" effect="light" :show-after="1000">
						<el-button type="danger" circle plain @click.stop="confirmBox(client.id)">
							<el-icon><i-ep-delete /></el-icon>
						</el-button>
					</el-tooltip>
				</div>
			</div>
		</template>
		<div class="card-body">
			<ServerCardInfo style="width:335px" :client="props.client" />
			<transition name="el-fade-in">
				<div v-if="!notDetail">
					<ServerCardDetail style="width:570px" :clientId="props.client.id" />
				</div>
			</transition>
		</div>
	</el-card>
	<ServerEditForm :client="props.client" :formVisible="formVisible" @updated="emits('updated')"/>
</template>
<style scoped>
.detail-box {
	flex-direction: row;
	width: 1000px;
	overflow: hidden;
	cursor: pointer;
}
.card-body{
	display: flex;
	flex-direction: row;
}
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.not-detail-box {
	width: 385px
}
</style>