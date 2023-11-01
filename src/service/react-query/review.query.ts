import { IStore, updateStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

export interface ICreateReview {
	content: string
	productId: string
	userId: string
	rating?: number
	parentCommentId?: string
}

export const useCreateReviewMutation = () => {
	const reviewService = ApiService.createInstance()
	return useMutation(
		(payload: ICreateReview) => {
			return reviewService.createReview({
				data: payload
			})
		},
		{
			onSuccess: (data: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = false
					state.UserSlice.isSuccess = true
					state.UserSlice.successMess = 'Review successfully'
				})
			},
			onError: (error: any) => {}
		}
	)
}

export const useGetReviewByParentId = () => {
	const getReviewByParentId = ApiService.createInstance()
	return useMutation(
		(payload: any) => {
			return getReviewByParentId.getReviewByParentId({
				queryParams: payload
			})
		},
		{
			onSuccess: (data: any) => {},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.message
				})
			}
		}
	)
}
