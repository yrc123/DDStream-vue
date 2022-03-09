<script setup>
	import { reactive, defineProps, ref } from "vue";

	const props = defineProps({
		client:{
			type: Object,
		}
	})
</script>
<template>
	<div class="info-box">
		<div class="icon-box">
			<i-clarity-node-line class="server-icon" />
			<div v-if="client.up">
				<span class="status-dot" style="background: #95d475;"></span>
				在线
			</div>
			<div v-else>
				<span class="status-dot" style="background: #f89898;"></span>
				离线
			</div>
		</div>
		<div class="text-box">
			<el-popover
				placement="bottom"
				title="服务器名"
				:width="200"
				trigger="hover"
				:disabled="client.nickname.length <= 7"
				:content="client.nickname"
			>
				<template #reference>
					<div class="nickname-p hide-overflow-box"> {{ client.nickname }} </div>
				</template>
			</el-popover>
			<div> 地址： {{ client.hostname }} </div>
			<el-popover
				placement="bottom"
				title="备注"
				:width="200"
				trigger="hover"
				:disabled="client.note.length <= 7"
				:content="client.note"
			>
				<template #reference>
					<div class="hide-overflow-box"> 备注： {{ client.note }} </div>
				</template>
			</el-popover>
		</div>
	</div>
</template>
<style scoped>
.status-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.info-box {
	display: flex;
	justify-content: space-around;
	text-align: left;
	margin-left: 10px;
}
.info-box>div{
	margin: 0 0 10px
}
.nickname-p{
	font-size: 25px;
}
.server-icon {
	color: #73767a;
	height: 100px;
	width: 100px;
}
.icon-box {
	text-align: center;
}
.text-box {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.hide-overflow-box {
	overflow: hidden;
    text-overflow: ellipsis;
    width: 7em;
    white-space: nowrap;
}
</style>