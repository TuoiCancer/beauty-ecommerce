import { ProductInterface } from './product.interface'
import { UserInterface } from './user.interface'

export interface CartItemInterface {
	id: string
	cart_status: string
	cart_count_product: number
	cart_products: {
		[key: string]: {
			shop: UserInterface
			products: ProductInterface[]
		}
	}
}
