<script setup>
import { markRaw, reactive, ref, shallowRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import ServerCardInfo from "./ServerCardInfo.vue";
import ServerCardDetail from "./ServerCardDetail.vue"

	const props = defineProps({
		client:{
			type: Object
		}
	})
	const notDetail = ref(true)

	const cardClass = reactive({
		'not-detail-box': notDetail,
	})
	function changeCardMode() {
		if (props.client.up) {
			notDetail.value = !notDetail.value
		} else {
			notDetail.value = true
		}
	}
</script>
<template>
	<el-card class="detail-box" body-style="display: flex" :class="cardClass" @click="changeCardMode">
		<ServerCardInfo style="width:335px" :client="props.client" />
		<transition name="el-fade-in">
			<div v-if="!notDetail">
				<ServerCardDetail style="width:570px" :clientId="props.client.id" />
			</div>
		</transition>
	</el-card>
</template>
<style scoped>
.detail-box {
	display: flex;
	flex-direction: row;
	/* justify-content: left; */
	height: 175px;
	width: 1000px;
	overflow: hidden;
}
.not-detail-box {
	width: 385px
}
</style>