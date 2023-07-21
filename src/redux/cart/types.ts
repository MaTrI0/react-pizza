export type cartItem = {
	id: string
	title: string
	price: number
	count: number
	imageUrl: string
	size: number
	type: string
}

export interface CartSliceState {
	totalPrice: number
	items: Array<cartItem>
}
