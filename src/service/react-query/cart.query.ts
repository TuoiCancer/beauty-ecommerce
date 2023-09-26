import { IStore, updateStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

export const useAddToCart = () => {
	const addToCartService = ApiService.createInstance()
	return useMutation(
		(payload: any) => {
			return addToCartService.addToCart({
				data: payload
			})
		},
		{
			onSuccess: (data: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isSuccess = true
					state.UserSlice.successMess = data.message
					state.UserSlice.totalProductInCart = data.data.cart_count_product
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

export const useGetCartByUserId = (payload: any) => {
	const getCartByUserIdService = ApiService.createInstance()
	return useQuery(
		['getCartByUserId', payload],
		() => {
			return getCartByUserIdService.getCartByUserId({
				queryParams: payload
			})
		},
		{
			onSuccess: (data: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.totalProductInCart = data.cart_count_product
				})
			},
			onError: (error: any) => {}
		}
	)
}
