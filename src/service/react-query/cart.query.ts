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
					state.UserSlice.totalProductInCart = data.cart.cart_count_product
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

/**
 * @param payload userId: string
 * @returns cart_count, cart_status
 */
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

/**
 * @param payload userId:string
 * @returns detail info of cart: cart_product, shop_info,...
 */
export const useGetCartDetailByUserId = (payload: any) => {
	const getCartDetailByUserIdService = ApiService.createInstance()
	return useQuery(
		['getCartDetailByUserId', payload],
		() => {
			return getCartDetailByUserIdService.getCartDetailByUserId({
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

export const useUpdateCartUser = () => {
	const updateCartUserService = ApiService.createInstance()
	return useMutation(payload => {
		return updateCartUserService.updateCartUser({
			data: payload
		})
	})
}

export const useDeleteCartUser = () => {
	const deleteCartUserService = ApiService.createInstance()
	return useMutation(payload => {
		return deleteCartUserService.deleteCartUser({
			data: payload
		})
	})
}
