<script setup>
	import { defineProps, reactive, ref, watch } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import _ from 'lodash'
import SafeForm from '../../components/SafeForm.vue';

</script>
<template>
	<div class="safe-body" >
		<el-card 
			ref="cardBoxRef"
		>
			<div class="safe-card-body-box">
				<p class="safe-title">二级验证</p>
				<el-divider></el-divider>
				<div  style="width: 400px" >
					<SafeForm />
				</div>
			</div>
		</el-card>
	</div>
</template>
<style scoped>
.safe-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.safe-title {
    font-size: 25px;
    letter-spacing: 3px;
}
.safe-body {
    display: flex;
    flex-direction: column;
    align-items: center;
	height: 100vh;
	justify-content: center;
	background-color:   #f4f4f5;
}

.safe-card-body-box {
    margin: 25px 30px 30px 30px;
}
</style>