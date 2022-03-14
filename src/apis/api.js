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
const listRoles = () => {
	return instance.get(`/roles`)
}
const getInfo = () => {
	return instance.get(`/info`)
}
const listUsers = (data) => {
	return instance.post(`/users:search`, data)
}
const addUser = (data) => {
	return instance.post(`/users`, data)
}
const deleteUser = (data) => {
	return instance.delete(`/users/${data.userId}`)
}
const deleteUsers = (data) => {
	return instance.post(`/users:delete`, data.map((value) => value.id))
}
const updateUser = (data) => {
	return instance.patch(`/users/${data.id}`, data)
}
export default {
	login,
	logout,
	getUserInfo,
	getClientActuator,
	getClientList,
	updateClient,
	deleteClient,
	listRoles,
	getInfo,
	addUser,
	listUsers,
	updateUser,
	deleteUser,
	deleteUsers,
}