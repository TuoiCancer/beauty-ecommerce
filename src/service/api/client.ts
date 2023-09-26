import { useAuthStore } from '@/store/authStore'
import axios from 'axios'

export const BASE_URL = 'http://localhost:3003/api'

const apiClient = axios.create({
	headers: {
		'Content-Type': 'application/json'
	},
	baseURL: BASE_URL,
	responseType: 'json',
	withCredentials: true
})

apiClient.interceptors.request.use(
	async (config: any) => {
		if (
			config.url?.indexOf('login') >= 0 ||
			config.url?.indexOf('signup') >= 0 ||
			config.url?.indexOf('refresh-token') >= 0
		) {
			return config
		}
		// get token from localStorage
		const data = JSON.parse(localStorage.getItem('data') || 'null')
		if (data) {
			const { token, user } = data
			const { accessToken, maxAge, refreshToken } = token
			const now = new Date().getTime()
			const timeExpired = new Date(maxAge).getTime()
			const isRemember = localStorage.getItem('rememberPassword') === 'true'
			if (now > timeExpired && !isRemember) {
				// delete information in localStorage
				// localStorage.removeItem('data')
			}
		}

		return config
	},
	err => {
		return Promise.reject(err)
	}
)

apiClient.interceptors.response.use(response => {
	return response
})

const fetchApi = async (url: string, config: any) => {
	return new Promise((resolve, reject) => {
		apiClient
			.request({
				url,
				...config
			})
			.then(response => {
				resolve(response.data)
			})
			.catch(error => {
				reject(error)
			})
	})
}

const configApi: any = ({ path, method, headers }: any) => {
	const config: any = {
		method: '',
		headers: '',
		data: ''
	}

	if (headers) {
		config.headers = headers
	}

	if (method) {
		config.method = method
	}

	return ({ data, pathParams, queryParams }: any) => {
		let url = ''
		let params = ''
		let query = ''
		if (path) {
			url += `/${path}`
		}
		if (pathParams) {
			Object.keys(pathParams).forEach(key => {
				params = path.replace(`{${key}}`, pathParams[key])
			})
			url += params
		}
		if (queryParams) {
			query = Object.keys(queryParams)
				.map(key => `${key}=${queryParams[key]}`)
				.join('&')

			url += `?${query}`
		}

		if (data) {
			config.data = data
		}
		return fetchApi(url, config)
	}
}

export default configApi
