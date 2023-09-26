import { ApiService } from '../api/ApiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductInterface } from '@/utils/product.interface'
import { IStore, updateStore } from '@/store'

interface querySearchProduct {
	page: number
	limit: number
	sort?: string
	product_shop?: string
	product_category?: string
	search_key?: string
}

type similarProductPayload = {
	product_category: string
	shop_id: string
	product_id: string
}

export const useCreateProduct = () => {
	const createProductService = ApiService.createInstance()

	return useMutation(
		(payload: any) => {
			return createProductService.createProduct({
				data: payload
			})
		},
		{
			onSuccess: (data: any) => {},
			onError: (error: any) => {}
		}
	)
}

export const useGetProductByPage = () => {
	const getProductByPageService = ApiService.createInstance()
	return useMutation(
		(payload: querySearchProduct) => {
			const { page, limit, product_shop, sort, product_category, search_key } =
				payload
			const filter: querySearchProduct = {
				page,
				limit,
				...(search_key && { search_key }),
				...(product_category &&
					product_category !== 'All' && { product_category })
			}
			if (product_shop && product_shop !== 'All') {
				if (product_shop === `L'Oréal`) {
					filter.product_shop = 'Oreal'
				} else {
					filter.product_shop = product_shop
				}
			}

			if (sort && sort === 'price') {
				filter.sort = 'product_price'
			} else if (sort && sort === 'createdAt') {
				filter.sort = 'createdAt'
			}
			return getProductByPageService.getProductByPage({
				queryParams: filter
			})
		},
		{
			onSuccess: (data: any) => {},
			onError: (error: any) => {}
		}
	)
	// return useQuery(
	// 	['getProductByPage', payload],
	// 	() => {
	// 		return getProductByPageService.getProductByPage({
	// 			queryParams: {
	// 				...payload,
	// 				product_shop:
	// 					payload.product_shop === `L'Oréal` ? `Oreal` : payload.product_shop
	// 			}
	// 		})
	// 	},
	// 	{
	// 		onError: (error: any) => {
	// 			console.log('error useGetProductByPage -----------------> ', error)
	// 		}
	// 	}
	// )
}

export const useGetProductById = ({ id }: { id: string }) => {
	const getProductByIdService = ApiService.createInstance()
	return useQuery(
		['get product by ID', id],
		() => {
			return getProductByIdService.getProductById({
				queryParams: {
					id: `${id}`
				}
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

export const useGetSimilarProduct = (payload: similarProductPayload) => {
	const getSimilarProductService = ApiService.createInstance()
	return useQuery(
		['Get similar product', payload],
		() => {
			return getSimilarProductService.getSimilarProduct({
				queryParams: {
					shop_id: payload.shop_id,
					product_category: payload.product_category,
					product_id: payload.product_id
				}
			})
		}
		// {
		// 	onError: (error: any) => {
		// 		updateStore((state: IStore) => {
		// 			state.UserSlice.isError = true
		// 			state.UserSlice.errorMess = error.message
		// 		})
		// 	}
		// }
	)
}
