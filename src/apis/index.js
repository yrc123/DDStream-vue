import axios from "axios";
import Message from "js/Message";
import { useCookies } from "vue3-cookies";
import { useRouter } from 'vue-router';
import { router, paths } from '@/router/index'
function getToken() {
	if (localStorage.hasOwnProperty('satoken')) {
		return localStorage.getItem('satoken')
	} else if (sessionStorage.hasOwnProperty('satoken')) {
		return sessionStorage.getItem('satoken')
	} else {
		return null
	}
}
const instance = axios.create({
	baseURL: 'http://127.0.0.1:7000/api/v1',
	setTimeout: 5000,
})
instance.interceptors.request.use(
	(config) => {
		config.headers.satoken = getToken()
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
			Message.error(res.code + ': ' + res.message,() => {
				switch(res.code) {
					case 401:
						router.push(paths.safe)
						break;
					case 403:
						if (res.data.extendCode == 1) {
							router.push(paths.auth)
						}
						break;
					default:
						break;
				}
			})
		}
		return Promise.reject(error)
	}
)

export default instance