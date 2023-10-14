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
	shippingInfor: any
	setShippingInfor: (value: any) => void
	paymentInfor: any
	setPaymentInfor: (value: any) => void
	lang: string
	setLang: (value: string) => void
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
	lang: 'en',
	username: '',
	password: '',
	isRefresh: false,
	shippingInfor: {
		firstName: '',
		lastName: '',
		address: '',
		phone: '',
		city: '',
		district: ''
	},
	paymentInfor: {
		paymentMethod: 'card',
		paymentData: {
			cardNumber: '',
			cardName: ''
		}
	},
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
			UserSlice.isReloadPage = isReloadPage
		}),
	setShippingInfor: cbFunction => {
		set(({ UserSlice }: any) => {
			UserSlice.shippingInfor = cbFunction(UserSlice.shippingInfor)
		})
	},
	setPaymentInfor: cbFunction => {
		set(({ UserSlice }: any) => {
			UserSlice.paymentInfor = cbFunction(UserSlice.paymentInfor)
		})
	},
	setLang: lang =>
		set(({ UserSlice }: any) => {
			UserSlice.lang = lang
		})
})

export default UserSlice as (
	set: StoreApi<IUserSlice>['setState'],
	get: StoreApi<IUserSlice>['getState'],
	api: StoreApi<IUserSlice>
) => IUserSlice
