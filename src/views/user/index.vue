<script setup>
import { useRoute } from "vue-router";
import UserInfo from "components/user/UserInfo.vue";
	const route = useRoute()
</script>
<template>
	<UserInfo :userId="route.params.userId"></UserInfo>
</template>
<style scoped>

</style>