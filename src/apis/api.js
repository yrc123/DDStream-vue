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

const getUserInfo = (data) => {
	return instance.get(`/users/${data.userId}`)
}
const getClientActuator = (data) => {
	return instance.get(`/actuator/${data.clientId}`)
}
const getClientList = () => {
	return instance.get(`/clients`)
}
export default {
	login,
	getUserInfo,
	getClientActuator,
	getClientList,
}