import { ApiService } from '../api/ApiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductInterface } from '@/utils/product.interface'
import { IStore, updateStore } from '@/store'

interface querySearchProduct {
	page: number
	limit: number
	sort?: string
	order?: string
	product_shop?: string
	product_category?: string
	search_key?: string
	user_id: string
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
			const {
				page,
				limit,
				product_shop,
				sort,
				product_category,
				search_key,
				order,
				user_id
			} = payload
			const filter: querySearchProduct = {
				page,
				limit,
				user_id,
				order,
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
					product_id: payload.product_id,
					limit: 5
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

export const useGetBestSellerProduct = () => {
	const getBestSellerProductService = ApiService.createInstance()
	return useQuery(
		['Get best seller product'],
		() => {
			return getBestSellerProductService.getTopBestSeller({})
		},
		{
			onSuccess: (data: any) => {},
			onError: (error: any) => {}
		}
	)
}

export const useGetBestSellerProductsByShopId = (shopId: string) => {
	const getBestSellerProductService = ApiService.createInstance()
	return useQuery(['Get best seller product by shop id', shopId], () => {
		return getBestSellerProductService.getBestSellerProductsByShopId({
			pathParams: {
				shopId: shopId
			}
		})
	})
}

export const useRecommendProductForUser = () => {
	const recommendProductForUserService = ApiService.createInstance()
	return useMutation((payload: { userId: string }) => {
		return recommendProductForUserService.recommendProductForUser({
			queryParams: {
				userId: payload.userId,
				n: 5
			}
		})
	})
}
