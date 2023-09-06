import { ApiService } from '../api/ApiClient'
import { useMutation } from '@tanstack/react-query'

export const useCreateProduct = () => {
	const createProductService = ApiService.createInstance()

	return useMutation(
		(payload: any) => {
			return createProductService.createProduct({
				data: payload
			})
		},
		{
			onSuccess: (data: any) => {
				console.log('data-----------------> ', data)
			},
			onError: (error: any) => {
				console.log('error-----------------> ', error)
			}
		}
	)
}
