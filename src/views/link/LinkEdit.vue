<script setup>
	import { computed, defineProps, onMounted, reactive, ref, watch, watchEffect } from 'vue';
	import service from 'apis/api'
	import Message from "js/Message";
	import {openConfirmBox} from "js/common";
	import _ from 'lodash'
	import { useRoute, useRouter } from 'vue-router';
	import { v4 as uuidv4 } from 'uuid'

	const router = useRouter()
	const route = useRoute()
	class FFmpegLink {
		constructor() {
			this.ffmpegList = new Array()
			this.linkListCollapse = new Array()
			this.name = ""
		}
	}
	class FFmpegLinkItem {
		constructor() {
			this.clientId = ""
			this.ffmpegConfig = {
					name: uuidv4(),
					config: {
					ffmpegProxy: {
						proxyType: "NO_PROXY",
						httpUrl: null
					},
					ffmpegInput: {
						rate: true,
						showType: "simple",
						simple: {
							ip: "",
							name: "",
							format: "",
						}
					},
					ffmpegOutputList: new Array(),
					linkItemCollapse: new Array()
				},
				advancedConfig: new Array()
			}
		}
	}
	class FFmpegOutputItem {
		constructor() {
			this.ffmpegAudioCodec = {
				codecType: "COPY",
			}
			this.ffmpegVideoCodec = {
				codecType: "COPY",
			}
			this.ffmpegFormat = {
				formatType: "",
				ffmpegHlsFlags: new Array()
			}
			this.ffmpegOutput = {
				overrideOutputFiles: true,
				showType: "simple",
				simple: {
					name: "",
					format: "",
				}
			}
			this.outputItemCollapse = new Array()
		}
	}
	const data = ref({})
	const emits = defineEmits(['beforeLoaded','afterLoaded'])
	emits('beforeLoaded')
	watchEffect(() => {
		const id = route.params.id
		if (id == null) {
			emits('afterLoaded')
			data.value = new FFmpegLink()
		} else {
			getData(id)
		}
	})
	function getData(id) {
		service.getFFmpegLink({id: id})
			.then((res) => {
				data.value = res.data
				data.value.ffmpegList.forEach((linkItem, index) => {
					const input = linkItem.ffmpegConfig.config.ffmpegInput
					input.simple = {
						ip: "",
						name: "",
						format: "",
					}
					input.showType= "simple"
					watch(input.simple,(oldValue, newValue) => {
						input.inputUri = `https://${newValue.ip}/${newValue.name}.${newValue.format}`
					},{
						deep: true
					})
					linkItem.ffmpegConfig.config.ffmpegOutputList.forEach((outputItem, index) => {
						const output = outputItem.ffmpegOutput
						output.simple = {
							name: "",
							format: "",
						}
						output.showType= "simple"
						watch(output.simple,(oldValue, newValue) => {
							output.outputUri = `${newValue.name}.${newValue.format}`
						},{
							deep: true
						})
					})
				})
				emits('afterLoaded')
			})
	}
	const formRef = ref()
	const isLoading = ref(false)

	function submit(formRef, data) {
		if (!formRef) return
		formRef.validate((valid) => {
			if (valid) {
				isLoading.value = true
				if (route.params.id == null) {
					service.insertFFmpegLink(data)
						.then((res) => {
							Message.success("提交成功")
							router.back()
						})
						.finally(() => {
							isLoading.value = false
						})
				} else {
					service.updateFFmpegLink(data)
						.then((res) => {
							Message.success("提交成功")
							router.back()
						})
						.finally(() => {
							isLoading.value = false
						})
				}
			} else {
				return false
			}
		})
	}
	const rules = reactive({
		id: [
			{
				required: true,
				message: '内容不得为空',
				trigger: 'blur',
			},
			{
				min: 1,
				max: 64,
				message: '长度应为 1 到 64',
				trigger: 'blur',
			},
		],
	})
	const proxyType = ref([
		{
			key:"NO_PROXY",
			label:"不使用代理",
			value:"NO_PROXY",
		},
		{
			key:"HTTP_PROXY",
			label:"使用http代理",
			value:"HTTP_PROXY",
		},
	])
	const audioCodecs = ref([
		{
			key:"COPY",
			label:"复制原格式",
			value:"COPY",
		},
		{
			key:"ACC",
			label:"ACC",
			value:"ACC",
		},
		{
			key:"APTX",
			label:"APTX",
			value:"APTX",
		},
		{
			key:"FLAC",
			label:"FLAC",
			value:"FLAC",
		},
		{
			key:"MP3",
			label:"MP3",
			value:"MP3",
		},
	])
	const videoCodecs = ref([
		{
			key:"COPY",
			label:"复制原格式",
			value:"COPY",
		},
		{
			key:"H264",
			label:"H264",
			value:"H264",
		},
		{
			key:"MPEG4",
			label:"MPEG4",
			value:"MPEG4",
		},
	])
	const formatType = ref([
		{
			key: "FLV",
			label: "FLV",
			value: "flv",
		},
		{
			key: "HLS",
			label: "HLS",
			value: "m3u8",
		},
		{
			key: "DASH",
			label: "DASH",
			value: "mdp",
		},
	])
	const hlsFlags = ref([
		{
			key: "DELETE_SEGMENTS",
			label: "删除列表外视频片段",
			value: "DELETE_SEGMENTS",
		},
	])
	const linkList = computed(() => {
		return data.value.ffmpegList.map((value, index) => {
			return {
				key: index,
				label: "推流节点 " + (index + 1),
				value: index,
			}
		})
	})
	function addLinkItem() {
		const linkItem = reactive(new FFmpegLinkItem())
		const input = linkItem.ffmpegConfig.config.ffmpegInput
		watch(input.simple,(oldValue, newValue) => {
			input.inputUri = `https://${newValue.ip}/video/${newValue.name}.${newValue.format}`
		},{
			deep: true
		})
		const list = new Array()
		for(let i=0; i < data.value.ffmpegList.length + 1; i++){
			list.push({
				key: i,
				label: "推流节点 " + (i + 1),
				value: i,
			})
		}
		showInsertDialog(
			"添加流节点",
			list,
			(index) => {
				data.value.ffmpegList.splice(index, 0, linkItem)
			}
		)
	}
	function removeLinkItem(index) {
		openConfirmBox("确认删除？", () => {
			data.value.ffmpegList.splice(index, 1)
			Message.success("删除成功")
		})
	}
	function addOutputItem(index) {
		const outputItem = reactive(new FFmpegOutputItem())
		const link = data.value.ffmpegList[index].ffmpegConfig.config
		const output = outputItem.ffmpegOutput
		watch(output.simple,(oldValue, newValue) => {
			output.outputUri = `video/${newValue.name}.${newValue.format}`
		},{
			deep: true
		})
		const list = new Array()
		for(let i=0; i < link.ffmpegOutputList.length + 1; i++){
			list.push({
				key: i,
				label: "输出流" + (i + 1),
				value: i,
			})
		}
		showInsertDialog(
			"添加流节点",
			list,
			(index) => {
				link.ffmpegOutputList.splice(index, 0, outputItem)
			}
		)
	}
	function removeOutputItem(linkIndex, outputIndex) {
		openConfirmBox("确认删除？", () => {
			data.value.ffmpegList[linkIndex].ffmpegConfig.config.ffmpegOutputList.splice(outputIndex, 1)
			Message.success("删除成功")
		})
	}
	const insertDialog = reactive({
		show: false,
		select: 0,
	})
	function showInsertDialog(title, list, afterConfirm) {
		insertDialog.title = title
		insertDialog.list = list
		insertDialog.show = true
		insertDialog.select = list.length - 1
		insertDialog.afterConfirm = (index) => {
			afterConfirm(index)
			insertDialog.show = false
			Message.success("添加成功")
		}
	}
	const clientsLoading = ref(true)
	const clientsRemote = ref([])
	const loadClient = _.throttle((flag) => {
		if (flag == true) {
			clientsLoading.value = true
			service.listClients()
				.then((res) => {
					clientsRemote.value = res.data
						.map((value, index) => {
							return {
								id: value.id,
								key: index,
								label: value.nickname,
								value: `${value.hostname}:${value.port}`,
							}
						})
						clientsLoading.value = false
				})
		}
	}, 5000)
	onMounted(() => {
		loadClient(true)
	})
	
</script>
<template>
	<div class="button-top-box">
		<div class="button-left-box">
			<el-button type="primary" plain @click="addLinkItem()">添加推流节点</el-button>
		</div>
	</div>
	<el-form 
		ref="formRef" 
		:model="data" 
		label-position="left"
		label-width="auto"
	>
		<el-form-item prop="complexInputUri" label="链路名">
			<el-input v-model="data.name" placeholder="请输入链路名"/>
		</el-form-item>
		<el-collapse v-model="data.linkListCollapse">
			<el-collapse-item 
				v-for="(linkItem, linkIndex) in data.ffmpegList"
				:key="linkIndex"
				:name="linkIndex"
				class="link-list-box"
			>
				<template #title>
					<div class="item-list-title">
						<div class="item-title">
							推流节点 {{ linkIndex + 1 }}
						</div>
						<div>
							<el-button type="primary" plain @click.stop="addOutputItem(linkIndex)">
								添加输出流
							</el-button>
							<el-button 
								type="danger" 
								circle 
								plain 
								size="small"
								@click.stop="removeLinkItem(index)"
							>
								<el-icon><i-ep-delete /></el-icon>
							</el-button>
						</div>
					</div>
				</template>
				<el-form-item prop="simpleInputServer" label="输入流服务器">
					<el-select
						v-model="linkItem.clientId"
						collapse-tags
						filterable
						placeholder="推流服务器"
						:loading="clientsLoading"
						@visible-change="(flag) => loadClient(flag)"
					>
						<el-option
							v-for="item in clientsRemote"
							:key="item.id"
							:label="item.label"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-collapse v-model="linkItem.linkItemCollapse">
					<el-collapse-item name=0>
						<template #title>
							<div class="item-title">
								代理
							</div>
						</template>
						<div class="proxy-box">
							<el-form-item prop="httpUrl" label="代理">
								<el-input
									v-model="linkItem.ffmpegConfig.config.ffmpegProxy.httpUrl"
									placeholder="请输入代理url"
									:disabled="linkItem.ffmpegConfig.config.ffmpegProxy.proxyType != 'HTTP_PROXY'"
									class="input-with-select"
								>
									<template #prepend>
										<el-select 
											v-model="linkItem.ffmpegConfig.config.ffmpegProxy.proxyType" 
											placeholder="选择代理模式" 
											style="width: 150px"
										>
											<el-option
												v-for="item in proxyType"
												:key="item.key"
												:label="item.label"
												:value="item.value"
											/>
										</el-select>
									</template>
								</el-input>
							</el-form-item>
						</div>
					</el-collapse-item>
					<el-collapse-item name=1>
						<template #title>
							<div class="item-title">
								输入流
							</div>
						</template>
						<div class="input-box">
							<div style="margin-top: 20px">
								<el-radio-group v-model="linkItem.ffmpegConfig.config.ffmpegInput.showType" size="small">
									<el-radio-button label="simple" >简易模式</el-radio-button>
									<el-radio-button label="complex" >详细模式</el-radio-button>
								</el-radio-group>
							</div>
							<template v-if="linkItem.ffmpegConfig.config.ffmpegInput.showType == 'simple'">
								<el-form-item prop="complexInputUri" label="输入流地址">
									<el-input v-model="linkItem.ffmpegConfig.config.ffmpegInput.inputUri" placeholder="预期地址" disabled/>
								</el-form-item>
								<el-form-item prop="simpleInputServer" label="输入流服务器">
									<el-select
										v-model="linkItem.ffmpegConfig.config.ffmpegInput.simple.ip"
										collapse-tags
										filterable
										placeholder="推流服务器"
										:loading="clientsLoading"
										@visible-change="(flag) => loadClient(flag)"
									>
										<el-option
											v-for="item in clientsRemote"
											:key="item.key"
											:label="item.label"
											:value="item.value"
										>
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item prop="simpleInputServer" label="输入流名称">
									<el-input v-model="linkItem.ffmpegConfig.config.ffmpegInput.simple.name" placeholder="流名称" />
								</el-form-item>
								<el-form-item prop="simpleInputServer" label="输入协议">
									<el-select v-model="linkItem.ffmpegConfig.config.ffmpegInput.simple.format" class="m-2" placeholder="选择输入流协议" size="large">
										<el-option
											v-for="item in formatType"
											:key="item.key"
											:label="item.label"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
							</template>
							<template v-else>
								<el-form-item prop="complexInputUri" label="输入流地址">
									<el-input v-model="linkItem.ffmpegConfig.config.ffmpegInput.inputUri" placeholder="请输入要推流视频地址" />
								</el-form-item>
							</template>
							<el-form-item prop="rate" label="使用原生速率">
								<el-switch
									v-model="linkItem.ffmpegConfig.config.ffmpegInput.rate"
									size="large"
								/>
							</el-form-item>
						</div>
					</el-collapse-item>
					<el-collapse-item 
						v-for="(outputItem, outputIndex) in linkItem.ffmpegConfig.config.ffmpegOutputList"
						:key="outputIndex"
						:name="outputIndex + 2"
						class="output-list-box"
					>
						<template #title>
							<div class="item-list-title">
								<div class="item-title">
									输出流 {{ outputIndex + 1 }}
								</div>
								<el-button 
									type="danger" 
									circle 
									plain 
									size="small"
									@click.stop="removeOutputItem(linkIndex, outputIndex)"
								>
									<el-icon><i-ep-delete /></el-icon>
								</el-button>
							</div>
						</template>
						<el-collapse v-model="outputItem.outputItemCollapse">
							<el-collapse-item  name=0>
								<template #title>
									<div class="item-title">
										音频编码器
									</div>
								</template>
								<div class="audio-codec-box">
									<el-form-item prop="audioCodec" label="音频编码器">
										<el-select v-model="outputItem.ffmpegAudioCodec.codecType" class="m-2" placeholder="Select" size="large">
											<el-option
												v-for="item in audioCodecs"
												:key="item.key"
												:label="item.label"
												:value="item.value"
											/>
										</el-select>
									</el-form-item>
									<el-form-item prop="audioBitrate" label="比特率">
										<el-input v-model="outputItem.ffmpegAudioCodec.bitrate" placeholder="请输入比特率" />
									</el-form-item>
								</div>
							</el-collapse-item>
							<el-collapse-item name=1>
								<template #title>
									<div class="item-title">
										视频编码器
									</div>
								</template>
								<div class="video-codec-box">
									<el-form-item prop="videoCodec" label="视频编码器">
										<el-select v-model="outputItem.ffmpegVideoCodec.codecType" class="m-2" placeholder="Select" size="large">
											<el-option
												v-for="item in videoCodecs"
												:key="item.key"
												:label="item.label"
												:value="item.value"
											/>
										</el-select>
									</el-form-item>
									<el-form-item prop="videoBitrate" label="比特率">
										<el-input v-model="outputItem.ffmpegVideoCodec.bitrate" placeholder="请输入比特率" />
									</el-form-item>
									<el-form-item prop="videoMaxrate" label="最大比特率">
										<el-input v-model="outputItem.ffmpegVideoCodec.maxrate" placeholder="请输入比特率" />
									</el-form-item>
									<el-form-item prop="videoFps" label="帧率">
										<el-input v-model="outputItem.ffmpegVideoCodec.fps" placeholder="请输入比特率" />
									</el-form-item>
								</div>
							</el-collapse-item>
							<el-collapse-item name=2>
								<template #title>
									<div class="item-title">
										视频封装
									</div>
								</template>
								<div class="format-box">
									<el-form-item prop="format" label="视频封装格式">
										<el-select v-model="outputItem.ffmpegFormat.formatType" class="m-2" placeholder="Select" size="large">
											<el-option
												v-for="item in formatType"
												:key="item.key"
												:label="item.label"
												:value="item.key"
											/>
										</el-select>
									</el-form-item>
									<template v-if="outputItem.ffmpegFormat.formatType == 'HLS'">
										<el-form-item prop="hlsInitTime" label="初始片段长度">
											<el-input v-model="outputItem.ffmpegFormat.hlsInitTime" placeholder="设置初始片段长度，默认为0" />
										</el-form-item>
										<el-form-item prop="hlsTime" label="片段长度">
											<el-input v-model="outputItem.ffmpegFormat.hlsTime" placeholder="设置每个片段的时长，默认为2" />
										</el-form-item>
										<el-form-item prop="hlsListSize" label="引用片段数量">
											<el-input v-model="outputItem.ffmpegFormat.hlsListSize" placeholder="设置在播放列表中引用的片段数量,默认为5，如果为0，则保留所有片段" />
										</el-form-item>
										<el-form-item prop="hlsDeleteThreshold" label="删除阈值">
											<el-input v-model="outputItem.ffmpegFormat.hlsDeleteThreshold" placeholder="设置在保留在磁盘上的未引用段的数量" />
										</el-form-item>
										<el-form-item prop="hlsFlags" label="其他选项">
											<el-checkbox-group v-model="outputItem.ffmpegFormat.ffmpegHlsFlags">
												<el-checkbox  
													v-for="item in hlsFlags"
													:key="item.key"
													:label="item.value"
												> {{ item.label }} </el-checkbox>
											</el-checkbox-group>
										</el-form-item>
									</template>
									<template v-else-if="format == 'DASH'">

									</template>
								</div>
							</el-collapse-item>
							<el-collapse-item name=3>
								<template #title>
									<div class="item-title">
										输出流
									</div>
								</template>
								<div class="output-box">
									<div style="margin-top: 20px">
										<el-radio-group v-model="outputItem.ffmpegOutput.showType" size="small">
											<el-radio-button label="simple" >简易模式</el-radio-button>
											<el-radio-button label="complex" >详细模式</el-radio-button>
										</el-radio-group>
									</div>
									<template v-if="outputItem.ffmpegOutput.showType == 'simple'">
										<el-form-item prop="complexInputUri" label="输出流地址">
											<el-input v-model="outputItem.ffmpegOutput.outputUri" disabled placeholder="预期地址" />
										</el-form-item>
										<el-form-item prop="simpleInputServer" label="输出流名称">
											<el-input v-model="outputItem.ffmpegOutput.simple.name" placeholder="请输入输出流名称" />
										</el-form-item>
										<el-form-item prop="simpleInputServer" label="输出流协议">
											<el-select v-model="outputItem.ffmpegOutput.simple.format" class="m-2" placeholder="选择协议" size="large">
												<el-option
													v-for="item in formatType"
													:key="item.key"
													:label="item.label"
													:value="item.value"
												/>
											</el-select>
										</el-form-item>
									</template>
									<template v-else>
										<el-form-item prop="complexInputUri" label="输出流地址">
											<el-input v-model="outputItem.ffmpegOutput.outputUri" placeholder="请输入推流视频地址" />
										</el-form-item>
									</template>
								</div>
							</el-collapse-item>
						</el-collapse>
					</el-collapse-item>
				</el-collapse>
			</el-collapse-item>
		</el-collapse>
		<el-button type="primary" plain @click="submit(formRef, data)" :loading="isLoading">
			提交
		</el-button>
	</el-form>
  <el-dialog v-model="insertDialog.show" :title="insertDialog.title">
    <el-form :model="form">
      <el-form-item label="添加在" :label-width="formLabelWidth">
		   <el-select v-model="insertDialog.select" class="m-2" placeholder="位置" size="large">
				<el-option
					v-for="item in insertDialog.list"
					:key="item.key"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
      </el-form-item>
    </el-form>
    <template #footer>
		<span class="dialog-footer">
			<el-button @click="insertDialog.show = false">取消</el-button>
			<el-button type="primary" @click="insertDialog.afterConfirm(insertDialog.select)">确认</el-button>
		</span>
    </template>
  </el-dialog>

</template>
<style scoped>
.link-list-box .el-collapse-item .item-title {
	padding-left: 2em;
}
.link-list-box .output-list-box .el-collapse-item .item-title {
	padding-left: 4em;
}
.item-list-title {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding-right: 15px;
}
</style>