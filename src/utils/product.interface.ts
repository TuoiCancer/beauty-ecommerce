import { UserInterface } from './user.interface'

export interface ProductInterface {
	id: string
	createdAt: string
	updateAt: string
	product_listImages: string[]
	product_thumbnail: string
	product_attribute: object
	product_price: number
	product_quantity: number
	product_category: string
	product_ratingsAverage: number
	isDraft: boolean
	isPublished: boolean
	product_name: string
	product_description: string
	user: UserInterface
	quantityToBuy: number
}

export interface TopProductInterface {
	id: string
	is_deleted: boolean
	created_at: string
	updated_at: string
	product_list_images: string[]
	product_thumbnail: string
	product_attribute: object
	product_price: number
	product_quantity: number
	product_category: string
	product_ratings_average: number
	product_name: string
	product_description: string
	user: UserInterface
}
