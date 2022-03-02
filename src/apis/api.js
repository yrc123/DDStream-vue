import instance from "apis/index";
import Message from "js/Message";

const login = (data, afterMessage, afterAll) => {
	instance.post('/auth/login',data)
		.then((res) => {
			Message.success("登录成功",afterMessage)
		})
		.finally(() => {
			afterAll()
		})
}
export default {
	login
}