import { IStore, updateStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

interface ResponseI {
	user: any
	token: {
		accessToken: string
		refreshToken: string
		maxAge: number
	}
}

interface loginTypes {
	email: string
	password: string
	rememberPassword: boolean
	type?: string
	image?: string
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
			onSuccess: (data: ResponseI) => {
				const token = data.token.accessToken // Thay 'token' bằng tên field chứa token trong dữ liệu trả về
				const refreshToken = data.token.refreshToken
				const user = data.user
				// set token into local storage
				localStorage.setItem('data', JSON.stringify(data))
				updateStore((state: IStore) => {
					state.UserSlice.isLoggedIn = true
					state.UserSlice.user = data.user
					// Lưu token vào store Zustand
					state.AuthSlice.accessToken = token
					state.AuthSlice.refreshToken = refreshToken
					state.AuthSlice.xClientId = user.id
					//
					state.UserSlice.shippingInfor = {}
					state.UserSlice.paymentInfor = {}
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

	return useMutation(
		(payload: loginTypes) => {
			console.log('payload', payload)
			return loginRequestService.login({
				data: payload
			})
		},
		{
			onSuccess: (data: ResponseI) => {
				const token = data.token.accessToken // Thay 'token' bằng tên field chứa token trong dữ liệu trả về
				const refreshToken = data.token.refreshToken
				const user = data.user

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
					// Lưu token vào store Zustand
					state.AuthSlice.accessToken = token
					state.AuthSlice.refreshToken = refreshToken
					state.AuthSlice.xClientId = user.id
					//
					state.UserSlice.shippingInfor = {}
					state.UserSlice.paymentInfor = {}
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
					// remove token in Zustand
					state.AuthSlice.clearAccessToken()
					state.AuthSlice.clearRefreshToken()
				})
			},
			onError: (error: any) => {
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

	return useMutation(
		() => {
			return refreshTokenService.refreshToken()
		},
		{
			onSuccess: (data: ResponseI) => {
				const token = data.token.accessToken // Thay 'token' bằng tên field chứa token trong dữ liệu trả về
				const refreshToken = data.token.refreshToken
				const user = data.user

				// set token into local storage
				localStorage.setItem('data', JSON.stringify(data))
				// Lưu token vào store Zustand
				updateStore((state: IStore) => {
					state.AuthSlice.accessToken = token
					state.AuthSlice.refreshToken = refreshToken
				})
			},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					localStorage.removeItem('data')
					state.UserSlice.isLoggedIn = false
					state.UserSlice.user = null
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useUpdateUserInfo = () => {
	const updateUserInfoService = ApiService.createInstance()
	return useMutation(
		(payload: {
			id: string
			username: string
			gender: string
			phone: string
			address: string
			age: number
		}) => {
			return updateUserInfoService.updateUserInfo({
				data: {
					username: payload.username,
					gender: payload.gender,
					phone: payload.phone,
					address: payload.address,
					age: payload.age
				},
				pathParams: {
					id: payload.id
				}
			})
		},
		{
			onSuccess: (data: any) => {
				updateStore((state: IStore) => {
					;(state.UserSlice.user = data),
						(state.UserSlice.isSuccess = true),
						(state.UserSlice.successMess = 'Update information successfully')
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

export const useGetShopByName = (payload: { name: string }) => {
	const getShopByNameService = ApiService.createInstance()
	return useQuery(
		['getShopByName', payload],
		() => {
			return getShopByNameService.getShopByName({
				queryParams: {
					name: payload.name
				}
			})
		},
		{
			onSuccess: (data: any) => {},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}
