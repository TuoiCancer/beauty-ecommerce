import { IStore, updateStore } from '@/store'
import { useAuthStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

interface signupResponseI {
	user: any
	token: {
		accessToken: string
		refreshToken: string
	}
}

interface loginTypes {
	email: string
	password: string
	rememberPassword: boolean
}

export const useSignup = () => {
	const signupRequestService = ApiService.createInstance()

	return useMutation(
		(payload: any) => {
			return signupRequestService.signup({
				data: payload
			})
		},
		{
			onSuccess: (data: signupResponseI) => {
				// set token into local storage
				localStorage.setItem('data', JSON.stringify(data))
				updateStore((state: IStore) => {
					state.UserSlice.isLoggedIn = true
					state.UserSlice.user = data.user
				})
			},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.message
				})
			}
		}
	)
}

export const useLogin = () => {
	const loginRequestService = ApiService.createInstance()
	const setAuthToken = useAuthStore(state => state.setAuthToken)
	const setXClientId = useAuthStore(state => state.setXClientId)
	const setXRtokenId = useAuthStore(state => state.setXRtokenId)

	return useMutation(
		(payload: loginTypes) => {
			return loginRequestService.login({
				data: payload
			})
		},
		{
			onSuccess: (data: signupResponseI) => {
				const token = data.token.accessToken // Thay 'token' bằng tên field chứa token trong dữ liệu trả về
				const refreshToken = data.token.refreshToken
				const user = data.user

				// Lưu token vào store Zustand
				setAuthToken(token)
				setXClientId(user.id)
				setXRtokenId(refreshToken)
				// set token into local storage
				localStorage.setItem('data', JSON.stringify(data))
				localStorage.setItem(
					'rememberPassword',
					JSON.stringify(data.user.rememberPassword)
				)
				updateStore((state: IStore) => {
					state.UserSlice.isLoggedIn = true
					state.UserSlice.user = data.user
					state.UserSlice.rememberPassword = data.user.rememberPassword
				})
			},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useLogout = () => {
	const logoutService = ApiService.createInstance()

	return useMutation(
		() =>
			logoutService.logout({
				data: {}
			}),
		{
			onSuccess: () => {
				// remove data in localStorage
				localStorage.removeItem('data')
				updateStore((state: IStore) => {
					state.UserSlice.isLoggedIn = false
					state.UserSlice.user = null
				})
			}
		}
	)
}

export const useRefreshToken = () => {
	const refreshTokenService = ApiService.createInstance()

	const setAuthToken = useAuthStore(state => state.setAuthToken)
	const setXClientId = useAuthStore(state => state.setXClientId)
	const setXRtokenId = useAuthStore(state => state.setXRtokenId)

	return useMutation(
		(payload: any) => {
			console.log('======================CALL REFRESH TOKEN ===============')

			return refreshTokenService.refreshToken({
				data: payload
			})
		},
		{
			onSuccess: (data: signupResponseI) => {
				const token = data.token.accessToken // Thay 'token' bằng tên field chứa token trong dữ liệu trả về
				const refreshToken = data.token.refreshToken
				const user = data.user

				// Lưu token vào store Zustand
				setAuthToken(token)
				setXClientId(user.id)
				setXRtokenId(refreshToken)
				// set token into local storage
				localStorage.setItem('data', JSON.stringify(data))
				localStorage.setItem(
					'rememberPassword',
					JSON.stringify(data.user.rememberPassword)
				)
				updateStore((state: IStore) => {
					state.UserSlice.isLoggedIn = true
					state.UserSlice.user = data.user
					state.UserSlice.rememberPassword = data.user.rememberPassword
				})
			},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}
