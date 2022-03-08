import instance from "apis/index";

const login = (data) => {
	return instance.post('/auth/login',data)
}
const logout = () => {
	return instance.get('/auth/logout')
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
const getInfo = () => {
	return instance.get(`/info`)
}
export default {
	login,
	logout,
	getUserInfo,
	getClientActuator,
	getClientList,
	getInfo,
}