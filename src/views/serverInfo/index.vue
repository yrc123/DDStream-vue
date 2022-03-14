<script setup>
import { reactive, ref } from "@vue/reactivity";
import ServerCard from "components/serverInfo/ServerCard.vue";
import service from "apis/api"
import { onMounted } from "@vue/runtime-core";

	const clients = ref([])
	const emits = defineEmits(['beforeLoaded','afterLoaded'])
	emits('beforeLoaded')
	function getClientList() {
		service.getClientList()
			.then((res) => {
				clients.value = res.data
			})
			.finally(() => {
				emits('afterLoaded')
			})
	}
	onMounted(() => {
		getClientList()
	})


</script>
<template>
	<div class="server-box">
		<el-space wrap>
			<ServerCard 
				v-for="client in clients" 
				:key="client.id"
				:client="client"
				@updated="getClientList()"
			/>
		</el-space>
	</div>
</template>
<style scoped>
.server-box {
	display: flex;
	flex-wrap: wrap;
}
</style>