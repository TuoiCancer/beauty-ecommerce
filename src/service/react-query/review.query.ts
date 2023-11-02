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

export interface DeleteReviewDto {
	reviewId: string
	productId: string
}

export interface EditReviewDto {
	reviewId: string
	content: string
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
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
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

export const useDeleteReview = () => {
	const deleteReview = ApiService.createInstance()
	return useMutation(
		(payload: DeleteReviewDto) => {
			return deleteReview.deleteReviewAndChild({
				data: payload
			})
		},
		{
			onSuccess: (data: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = false
					state.UserSlice.isSuccess = true
					state.UserSlice.successMess = 'Delete review successfully'
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

export const useEditReview = () => {
	const editReview = ApiService.createInstance()
	return useMutation(
		(payload: EditReviewDto) => {
			return editReview.editReview({
				pathParams: {
					reviewId: payload.reviewId
				},
				data: {
					content: payload.content
				}
			})
		},
		{
			onSuccess: () => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = false
					state.UserSlice.isSuccess = true
					state.UserSlice.successMess = 'Edit review successfully'
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
