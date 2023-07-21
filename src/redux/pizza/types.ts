export type Pizza = {
	id: number
	title: string
	price: number
	imageUrl: string
	sizes: []
	types: []
	rating: number
}

export enum Status {
	LOADING = 'loading',
	SUCSESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: Array<Pizza>
	status: Status
}

export type SearchPizzaParams = {
	category: string
	search: string
	sortBy: string
	order: string
	currentPage: string
}
