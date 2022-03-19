<script setup>
	import { computed, onMounted, reactive, ref } from 'vue'
	import { ElTable } from 'element-plus'
	import { openConfirmBox } from "js/common"
	import service from 'apis/api'
	import Message from 'js/Message'
	import _, { reject } from 'lodash'

	const emits = defineEmits(['beforeLoaded','afterLoaded'])
	emits('beforeLoaded')
	const data = ref({})
	const registerLoading = ref(false)
	const keyPairLoading = ref(false)

	function getConfigData() {
		emits('beforeLoaded')
		service.getConfig()
			.then((res) => {
				data.value = res.data
				emits('afterLoaded')
			})
	}
	function copyText(text) {
		navigator.clipboard.writeText(text).then(() => {
			Message.success("复制成功")
		}, () => {
			Message.error("复制失败")
		})
	}
	function registerBeforeChange() {
		registerLoading.value = true
		return new Promise((resolve, reject) => {
			service.updateOpenRegister({
				open: !data.value.openRegister
			}).then((res) => {
				Message.success("修改成功")
				return resolve(true)
			},() => {
				return reject()
			}).finally(() => {
				registerLoading.value = false
			})
		})
	}
	function updateKeyPair() {
		keyPairLoading.value = true
		service.updateKeyPair()
			.then((res) => {
				Message.success("更新成功")
				getConfigData()
			}).finally(() => {
				keyPairLoading.value = false
			})
	}
	onMounted(() => {
		getConfigData()
	})

</script>
<template>
	<div class="config-box">
		<h2>JWT设置</h2>
		<el-divider />
		<el-form 
			:model="data" 
			label-position="top"
			label-width="auto"
			>
			<el-form-item prop="jwtPublicKey">
				<label class="jwt-label">
					<div>
						jwt公钥
					</div>
					<el-button circle @click="copyText(data.jwtPublicKey)" size="small">
						<el-icon ><i-ep-copy-document /></el-icon>
					</el-button>
				</label>
				<el-input 
					:autosize="{ minRows: 2, maxRows: 4 }"
					type="textarea"
					disabled
					v-model="data.jwtPublicKey" 
				/>
			</el-form-item>
			<el-form-item prop="jwtPrivateKey" >
				<label class="jwt-label">
					<div>
						jwt秘钥
					</div>
					<el-button circle @click="copyText(data.jwtPrivateKey)" size="small">
						<el-icon ><i-ep-copy-document /></el-icon>
					</el-button>
				</label>
				<el-input 
					:autosize="{ minRows: 2, maxRows: 4 }"
					type="textarea"
					disabled
					v-model="data.jwtPrivateKey" 
				/>
			</el-form-item>
			<div class="key-pair-button">
				<el-button :loading="keyPairLoading" @click="updateKeyPair">生成密钥对</el-button>
			</div>
		</el-form>
		<h2>其他</h2>
		<el-divider />
		<el-form 
			:model="data" 
			label-position="top"
			label-width="auto"
			>
			<el-switch
				active-text="开放注册"
				:loading="registerLoading"
				:before-change="registerBeforeChange"
				v-model="data.openRegister"
			/>
		</el-form>
	</div>
</template>
<style scoped>
.config-box {
	text-align: left;
	margin: 0 20px;
}
.el-divider{
	margin: 10px 0;
}
.el-form {
	width: 900px;
}
.el-form >>> label {
    font-size: 15px;
    font-weight: bold;
	line-height: 35px;
}
.jwt-label {
	display: flex;
	justify-content: space-between;
	width: 100%;
    align-items: center;
}
.key-pair-button {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
}
</style>