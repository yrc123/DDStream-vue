import { ElMessage } from "element-plus";
const Message = {
	success: (msg, onClose) => {
		ElMessage({
			showClose: true,
			message: msg,
			type: 'success',
			onClose: onClose
		})
	},
	warning: (msg, onClose) => {
		ElMessage({
			showClose: true,
			message: msg,
			type: 'warning',
			onClose: onClose
		})
	},
	error: (msg, onClose) => {
		ElMessage({
			showClose: true,
			message: msg,
			type: 'error',
			onClose: onClose
		})
	},
	info: (msg, onClose) => {
		ElMessage({
			showClose: true,
			message: msg,
			onClose: onClose
		})
	},
}
export default Message