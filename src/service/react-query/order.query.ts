import { IStore, updateStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

export const useCreateOrder = () => {
	const createOrderService = ApiService.createInstance()
	return useMutation(
		(payload: any) => {
			return createOrderService.createOrder({
				data: payload
			})
		},
		{
			onSuccess: data => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = false
					state.UserSlice.isSuccess = true
					state.UserSlice.successMess = 'Order successfully'
				})
			},
			onError: (err: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = err.response.data.message
				})
			}
		}
	)
}

export const useGetAllOrder = (payload: any) => {
	const getAllOrderService = ApiService.createInstance()
	return useQuery(['getAllOrder', payload], () => {
		return getAllOrderService.getAllOrderOfUser({
			pathParams: {
				userId: payload.userId
			}
		})
	})
}
