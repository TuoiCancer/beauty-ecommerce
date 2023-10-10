import { IStore, updateStore } from '@/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiService } from '../api/ApiClient'

export const useGetListVoucher = ({
	shopId,
	userId
}: {
	shopId: string
	userId?: string
}) => {
	const getVoucherService = ApiService.createInstance()

	return useQuery(['get lits voucher'], () => {
		return getVoucherService.getListVoucher({
			queryParams: {
				shopId: shopId,
				...(userId && { userId: userId })
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
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useGetVoucherByVoucherCode = () => {
	const getVoucherByVoucherCodeService = ApiService.createInstance()
	return useMutation(
		(voucherCode: string) => {
			return getVoucherByVoucherCodeService.getVoucherByVoucherCode({
				pathParams: {
					voucherCode: voucherCode
				}
			})
		},
		{
			onSuccess: (data: any) => {},
			onError: (error: any) => {
				updateStore((state: IStore) => {
					state.UserSlice.isError = true
					state.UserSlice.errorMess = error.response.data.message
				})
			}
		}
	)
}

export const useGetVoucherOfUser = ({ userId }: { userId: string }) => {
	const getVoucherOfUserService = ApiService.createInstance()
	return useQuery(['get voucher of user'], () => {
		return getVoucherOfUserService.getAllVoucherOfUser({
			pathParams: {
				userId: userId
			}
		})
	})
}
