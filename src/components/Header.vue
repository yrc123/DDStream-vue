<script setup>
	import { useRouter } from 'vue-router';
	import service from 'apis/api'
	import { ref } from "@vue/reactivity";
	import Message from "js/Message";
	import { paths } from '@/router/index'
import { computed } from '@vue/runtime-core';

	const router = useRouter()
	const userInfo = ref({})
	const nickname = computed(() => {
		if (userInfo.value.nickname != null) {
			return userInfo.value.nickname[0]
		} else {
			return ""
		}
	})

	function checkLogin() {
		if (localStorage.hasOwnProperty('satoken') || 
				sessionStorage.hasOwnProperty('satoken')) {
			initUserInfo()
			return true
		} else {
			return false
		}
	}
	function initUserInfo() {
		if (localStorage.hasOwnProperty("userInfo")) {
			userInfo.value = JSON.parse(localStorage.getItem("userInfo"))
		} else {
			service.getInfo()
				.then((res) => {
					userInfo.value = res.data
					localStorage.setItem("userInfo", JSON.stringify(res.data))
				})
		}
	}
	function toSetting() {
		router.push('/setting')
	}
	function logout() {
		service.logout()
			.then((res) => {
				Message.success("登出成功", () => router.go(0))
			})
		localStorage.removeItem("satoken")
		localStorage.removeItem("userInfo")
		sessionStorage.removeItem("satoken")
	}

</script>

<template>
	<div class="header">
		<div class="logo">
			<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.3rem" height="2.3rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
				<path fill="#CCD6DD" d="M3 3h2v33H3z"/><circle cx="4" cy="3" r="3" fill="#F4900C"/>
				<path fill="#66757F" d="M9 28H4a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2z"/>
				<path fill="#DD2E44" d="M31 27c0-2.209 6.209-6 4-6h-8.447c-1.203-1.464-4.595-3-7.053-3c-2.459 0-3.23 1.536-3.435 3H10c-2.209 0-3 1.791-3 4v4c0 2.209.791 4 3 4h25c2.209 0-4-3.791-4-6z"/>
				<circle cx="12" cy="25" r="3" fill="#FFF"/><circle cx="11.5" cy="24.5" r="1.5"/>
				<path fill="#F4ABBA" d="M35 21H15.962c2.068 2.286 4.742 6.465-.037 12H35c2.209 0-4-3.791-4-6s6.209-6 4-6z"/>
				<path fill="#66757F" d="M9 12H4a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2z"/>
				<path fill="#55ACEE" d="M31 11c0-2.209 6.209-6 4-6h-8.446c-1.203-1.464-4.595-3-7.054-3c-2.459 0-3.23 1.536-3.435 3H10C7.791 5 7 6.791 7 9v4c0 2.209.791 4 3 4h25c2.209 0-4-3.791-4-6z"/>
				<circle cx="12" cy="9" r="3" fill="#FFF"/><circle cx="11.5" cy="8.5" r="1.5"/><path fill="#BBDDF5" d="M35 5H15.962c2.068 2.286 4.742 6.465-.037 12H35c2.209 0-4-3.791-4-6s6.209-6 4-6z"/>
			</svg>
			<div class="logo-title">
				羊肉串
			</div>
		</div>
		<div class="toolbar">
			<template v-if="checkLogin()">
				<el-dropdown>
					<el-avatar> {{ nickname }}  </el-avatar>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="toSetting">设置</el-dropdown-item>
							<el-dropdown-item @click="logout">登出</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<template v-else>
				<el-button @click="router.push(paths.login)">登录</el-button>
			</template>
		</div>
	</div>
</template>

<style scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px var(--el-border-color-base) solid;
	height: 99%;
	padding: 0 40px;
}
.logo {
	display: flex;
	align-items: center;
}
.logo-title {
	margin-left: 20px;
	font-size: 1.3rem;
}
.toolbar{
	display: flex;
    align-items: center;
}
</style>


