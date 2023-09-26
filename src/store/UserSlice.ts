import { StateCreator, StoreApi } from 'zustand'

export interface IUserSlice {
	isLoggedIn: boolean
	setIsLoggedIn: (value: boolean) => void
	errorMess: string
	setErrorMess: (value: string) => void
	isError: boolean
	setIsError: (value: boolean) => void
	isSuccess: boolean
	setIsSuccess: (value: boolean) => void
	successMess: string
	setSuccessMess: (value: string) => void
	username: string
	password: string
	isRefresh: boolean
	setIsRefresh: (value: boolean) => void
	user: any
	rememberPassword: boolean
	totalProductInCart: number
	setTotalProductInCart: (value: number) => void
	isReloadPage: boolean
	setIsReloadPage: (value: boolean) => void
}

const UserSlice: StateCreator<
	IUserSlice,
	[
		['zustand/persist', IUserSlice],
		['zustand/devtools', never],
		['zustand/immer', never]
	],
	[],
	IUserSlice
> = set => ({
	isReloadPage: false,
	totalProductInCart: 0,
	isLoggedIn: false,
	isError: false,
	isSuccess: false,
	successMess: '',
	rememberPassword: false,
	errorMess: '',
	username: '',
	password: '',
	isRefresh: false,
	user: {},
	setIsRefresh: isRefresh =>
		set(({ UserSlice }: any) => {
			UserSlice.isRefresh = isRefresh
		}),

	setIsLoggedIn: isLoggedIn =>
		set(({ UserSlice }: any) => {
			UserSlice.isLoggedIn = isLoggedIn
		}),
	setIsSuccess: isSuccess =>
		set(({ UserSlice }: any) => {
			UserSlice.isSuccess = isSuccess
		}),
	setSuccessMess: successMess =>
		set(({ UserSlice }: any) => {
			UserSlice.successMess = successMess
		}),
	setErrorMess: errorMess =>
		set(({ UserSlice }: any) => {
			UserSlice.errorMess = errorMess
		}),
	setIsError: isError =>
		set(({ UserSlice }: any) => {
			UserSlice.isError = isError
		}),
	setTotalProductInCart: totalProductInCart =>
		set(({ UserSlice }: any) => {
			UserSlice.totalProductInCart = totalProductInCart
		}),
	setIsReloadPage: isReloadPage =>
		set(({ UserSlice }: any) => {
			console.log('isReloadPage in userSlice is ==========> ', isReloadPage)
			UserSlice.isReloadPage = isReloadPage
		})
})

export default UserSlice as (
	set: StoreApi<IUserSlice>['setState'],
	get: StoreApi<IUserSlice>['getState'],
	api: StoreApi<IUserSlice>
) => IUserSlice
