<script setup>
	import { defineProps, onMounted, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	const props = defineProps({
		userId: {
			type: String,
		}
	})
	const userDto = ref({})
	watch(() => props.userId, (newValue, oldValue) => {
		userDto.value = {}
		service.getUserInfo({ userId: newValue })
			.then((res) => {
				userDto.value = res.data
			})
	}, {
		immediate: true,
	})
</script>
<template>
	<div class="info-body">
		<div class="header-img"></div>
		<div>
			<div class="avatar-box">
				<el-avatar class="avatar" :size="120" :src="user"></el-avatar>
				<div class="tool-box">
					<el-button type="info" circle>
						<el-icon><i-ep-message /></el-icon>
					</el-button>
				</div>
			</div>
			<div class="username-box">
				<p class="nickname"> {{ userDto.nickname }} </p>
				<p class="username">{{ userDto.username }}</p>
			</div>
			<p class="email">{{ userDto.email }}</p>
		</div>
	</div>
</template>
<style scoped>
.info-body {
	display: flex;
	flex-direction: column;
	width: 600px;
}
.header-img {
	height: 200px;
}
.avatar-box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
}
.avatar {
	margin-top: -10%;
}
.username-box {
	justify-content: flex-start;
	text-align: left;
}
.username-box>p {
	padding-left: 20px;
    font-size: 20px;
}
</style>