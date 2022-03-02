import axios from "axios";
import Message from "js/Message";
const instance = axios.create({
	baseURL: 'http://127.0.0.1:7000/api/v1',
	setTimeout: 5000
})
instance.interceptors.request.use(
	(config) => {
		return config
	}, (error) => {
		return Promise.reject(err)
	}
)
instance.interceptors.response.use(
	(res) => {
		return res.data
	}, (error) => {
		if (error.response == null) {
			Message.error(error.message)
		} else {
			const res = error.response.data
			Message.error(res.code + ': ' + res.message)
		}
		return Promise.reject(error)
	}
)
export default instance