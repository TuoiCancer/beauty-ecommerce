import { StateCreator, StoreApi } from 'zustand'

export interface IUserSlice {
	isLoggedIn: boolean
	setIsLoggedIn: (value: boolean) => void
	errorMess: string
	setErrorMess: (value: string) => void
	isError: boolean
	setIsError: (value: boolean) => void
	username: string
	password: string
	isRefresh: boolean
	setIsRefresh: (value: boolean) => void
	user: any
	rememberPassword: boolean
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
	isLoggedIn: false,
	isError: false,
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

	setErrorMess: errorMess =>
		set(({ UserSlice }: any) => {
			UserSlice.errorMess = errorMess
		}),
	setIsError: isError =>
		set(({ UserSlice }: any) => {
			UserSlice.isError = isError
		})
})

export default UserSlice as (
	set: StoreApi<IUserSlice>['setState'],
	get: StoreApi<IUserSlice>['getState'],
	api: StoreApi<IUserSlice>
) => IUserSlice
