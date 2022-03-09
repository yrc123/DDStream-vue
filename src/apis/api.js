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
const updateClient = (data) => {
	return instance.patch(`/clients/${data.id}`, data)
}
const deleteClient = (data) => {
	return instance.delete(`/clients/${data.clientId}`)
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
	updateClient,
	deleteClient,
	getInfo,
}