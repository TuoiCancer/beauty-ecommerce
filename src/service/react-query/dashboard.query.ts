import { IStore, updateStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

interface IDashboardOverview {
	userId: string // user id
	from: string
	to: string
}

interface IOrderAnalytics {
	userId: string
	from: string
	to: string
}

export const useGetDashboardOrverview = (payload: IDashboardOverview) => {
	const getDashboardOrverviewService = ApiService.createInstance()
	return useQuery(
		['getDashboardOrverview', payload],
		() => {
			return getDashboardOrverviewService.getDashboardOverview({
				queryParams: payload
			})
		},
		{
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useGetOrderAnalytics = (payload: IOrderAnalytics) => {
	const getOrderAnalyticsService = ApiService.createInstance()
	return useQuery(
		['getOrderAnalytics', payload],
		() => {
			return getOrderAnalyticsService.getOrderAnalytics({
				queryParams: payload
			})
		},
		{
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useGetTop5Product = (payload: {
	userId: string
	from: string
	to: string
}) => {
	const getBestSellerProductService = ApiService.createInstance()
	return useQuery(
		['getBestSellerProduct', payload],
		() => {
			return getBestSellerProductService.getBestSellerProduct({
				queryParams: payload
			})
		},
		{
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useGetUserByCountry = (payload: {
	userId: string
	from: string
	to: string
}) => {
	const getUserByCountryService = ApiService.createInstance()
	return useQuery(
		['getUserByCountry', payload],
		() => {
			return getUserByCountryService.getUserByCountry({
				queryParams: payload
			})
		},
		{
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}
