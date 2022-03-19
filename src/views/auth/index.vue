<script setup>
	import { onMounted, reactive, ref } from 'vue';
	import user from "assets/default-user.png"
	import Typewriter from "components/Typewriter.vue"
	import _ from 'lodash'
	const typeTexts = ref([
		'hello world!!!',
	])
	const loginPage = ref(true)
	const cardStyle = reactive({})
	const cardBoxRef = ref()
	const formBoxRef = ref()
	const title = ref("用户登录")
	let cardHeight = null
	let loginHeight = 242
	let registerHeight = 322
	function changePage(pageName) {
		if (pageName == "login") {
			loginPage.value = true
			cardStyle.height = `${cardHeight}px`
			title.value = "用户登录"
		} else if (pageName == "register") {
			loginPage.value = false
			cardStyle.height = `${cardHeight + (registerHeight - loginHeight)}px`
			title.value = "用户注册"
		}
	}
	onMounted(() => {
		cardHeight = cardBoxRef.value.$el.clientHeight
		cardStyle.height = `${cardHeight}px`
	})
</script>
<template>
	<div class="login-body" >
		<el-card 
			class="" 
			:style="cardStyle" 
			ref="cardBoxRef"
		>
			<div class="login-card-body-box">
				<p class="login-title">{{ title }}</p>
				<el-avatar :size="70" :src="user"></el-avatar>
				<div class="login-text">
					<Typewriter :typeTexts="typeTexts"></Typewriter>
				</div>
				<el-divider></el-divider>
				<div ref="formBoxRef" style="width: 400px" >
					<transition name="el-fade-in" mode="out-in">
						<template v-if="loginPage">
							<Login @changePage="changePage('register')"/>
						</template>
						<template v-else >
							<Register @changePage="changePage('login')"/>
						</template>
					</transition>
				</div>
			</div>
		</el-card>
	</div>
</template>
<style scoped>
.large-radius {
	border: 1px solid var(--el-border-color-base);
	border-radius: var(--el-border-radius-base);
}
.login-card-body-box {
	margin: 25px 30px 70px 30px;
}
.login-text {
	font-size: 15px;
	color: #909399;
}
.login-title {
    font-size: 25px;
    letter-spacing: 3px;
}
.login-body {
    display: flex;
    flex-direction: column;
    align-items: center;
	height: 100vh;
	justify-content: center;
	background-color:   #f4f4f5;
}
</style>