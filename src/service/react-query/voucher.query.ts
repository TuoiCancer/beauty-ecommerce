import { IStore, updateStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

export const useGetListVoucher = ({
	shopId,
	userId
}: {
	shopId: string
	userId: string
}) => {
	const getVoucherService = ApiService.createInstance()

	return useQuery(['get lits voucher'], () => {
		return getVoucherService.getListVoucher({
			queryParams: {
				shopId: shopId,
				userId: userId
			}
		})
	})
}

export const useCollectVoucher = () => {
	const collectVoucherService = ApiService.createInstance()

	return useMutation(
		payload => {
			return collectVoucherService.collectVoucher({
				data: payload
			})
		},
		{
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.message
				})
			}
		}
	)
}
