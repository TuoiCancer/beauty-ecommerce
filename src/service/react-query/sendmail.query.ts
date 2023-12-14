import { IStore, updateStore } from '@/store'
import { useMutation } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

export const useSendEmailByNodeMailer = () => {
	const sendMailService = ApiService.createInstance()
	return useMutation(
		(payload: any) => {
			return sendMailService.sendEmailByNodeMailer({
				data: payload
			})
		},
		{
			onSuccess: (data: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = false
					state.UserSlice.successMess =
						'We have sent you an order confirmation. Please check your email!'
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
