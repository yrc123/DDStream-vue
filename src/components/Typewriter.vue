<script setup>
	import { defineProps, onMounted, ref } from 'vue';
	const props = defineProps({
		typeTexts: {
			type:Array,
			default: ['hello world!!!']
		}
	})
	const typeText = ref('')
	function type(showText, typeTexts) {
		let index = 0
		let len = 0
		let finishTimes = 0
		let startTimes = 0
		let typingFlag = true
		let delay = 0
		let timer = setInterval(() => {
			if (index >= typeTexts.length) {
				index = 0
			}
			let text = typeTexts[index]
			if (len > text.length && typingFlag == true) {
				if (finishTimes < 60) {
					finishTimes++
				} else {
					finishTimes = 0
					typingFlag = false
				}
			} else if (len < 0 && typingFlag == false) {
				if (startTimes < 20) {
					startTimes++
				} else {
					startTimes = 0
					typingFlag = true
					index++
				}
			} else if (typingFlag == true) {
				if (delay < 1) {
					delay++
				} else {
					delay = 0
					showText.value = text.substr(0, len++)
				}
			} else if(typingFlag == false) {
				showText.value = text.substr(0, len--)
			}

		}, 50)
	}
	onMounted(() => {
		type(typeText, props.typeTexts)
	})
</script>
<template>
	<p>
		{{ typeText }}<span class="typewriter-cursor">|</span>
	</p>
</template>
<style>

.typewriter-cursor{
  animation: flash 0.6s cubic-bezier(0.03,1,0.3,1) infinite alternate;
}
@keyframes flash {
	from {
		opacity: 0
	}
	to {
		opacity: 1
	}
}
</style>