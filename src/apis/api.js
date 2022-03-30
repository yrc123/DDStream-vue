import instance from "apis/index";

const login = (data) => {
	return instance.post('/auth/login',data)
}
const logout = () => {
	return instance.get('/auth/logout')
}
const register = (data) => {
	return instance.post('/auth/register',data)
}
const safe = (data) => {
	return instance.post('/auth/safe',data)
}
const setting = (data) => {
	return instance.patch('/auth/setting',data)
}
const getUserInfo = (data) => {
	return instance.get(`/users/${data.userId}`)
}
const getClientActuator = (data) => {
	return instance.get(`/actuator/${data.clientId}`)
}
const listClients = () => {
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
const searchUsers = (data) => {
	return instance.post(`/users:search`, data)
}
const insertUser = (data) => {
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
const listPermissions = () => {
	return instance.get(`/permissions`)
}
const insertRole = (data) => {
	return instance.post(`/roles`, data)
}
const listRoles = () => {
	return instance.get(`/roles`)
}
const searchRoles = (data) => {
	return instance.post(`/roles:search`, data)
}
const updateRole = (data) => {
	return instance.patch(`/roles/${data.id}`, data)
}
const deleteRole = (data) => {
	return instance.delete(`/users/${data.roleId}`)
}
const getConfig = () => {
	return instance.get(`/config`)
}
const updateConfig = (data) => {
	return instance.patch(`/config`, data)
}
const updateKeyPair = () => {
	return instance.get(`/config/key:reset`)
}
const updateOpenRegister = (data) => {
	return instance.get(`/config/register/${data.open}`)
}
const searchFFmpegLink = (data) => {
	return instance.post(`/ffmpeg-link:search`, data)
}
const insertFFmpegLink = (data) => {
	return instance.post(`/ffmpeg-link`, data)
}
const startFFmpegLink = (data) => {
	return instance.get(`/ffmpeg-link/${data.id}:start`)
}
const stopFFmpegLink = (data) => {
	return instance.get(`/ffmpeg-link/${data.id}:stop`)
}
const getFFmpegLinkStatus = (data) => {
	return instance.get(`/ffmpeg-link/${data.id}:status`)
}
export default {
	login,
	logout,
	register,
	safe,
	setting,
	getUserInfo,
	getClientActuator,
	listClients,
	updateClient,
	deleteClient,
	getInfo,
	insertUser,
	searchUsers,
	updateUser,
	deleteUser,
	deleteUsers,
	listPermissions,
	insertRole,
	listRoles,
	searchRoles,
	updateRole,
	deleteRole,
	getConfig,
	updateConfig,
	updateKeyPair,
	updateOpenRegister,
	insertFFmpegLink,
	startFFmpegLink,
	stopFFmpegLink,
	getFFmpegLinkStatus,
	searchFFmpegLink,
}