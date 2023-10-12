import { ProductInterface } from './product.interface'

export interface OrderInterface {
	id: string
	createdAt: string
	updateAt: string
	order_checkout: {
		totalPrice: number
	}
	order_shipping: any
	order_payment: {
		paymentMethod: string
		paymentData: {
			cardNumber: string
			cardName: string
		}
	}
	order_status: string
	products: ProductInterface[]
}

/**
 *   "order_shipping": {
                "city": "Hà Nội",
                "phone": "0956735634",
                "address": "PTIT",
                "district": "Thanh Xuân",
                "lastName": "Li",
                "firstName": "Rose"
            },
 */
