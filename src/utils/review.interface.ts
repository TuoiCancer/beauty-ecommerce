export interface ReviewInterface {
	id: string
	createdAt: string
	content: string
	rating: number
	user: {
		id: string
		username: string
		email: string
		avatar: string
	}
	totalReply: number
}
