import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzaSliceState, Status } from './types'

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Pizza[]>) => {
			state.items = action.payload
		},
	},
	extraReducers: {
		'pizzas/fetchPizzas/pending': state => {
			state.items = []
			state.status = Status.LOADING
		},
		'pizzas/fetchPizzas/fulfilled': (state, action) => {
			state.items = action.payload
			state.status = Status.SUCSESS
		},
		'pizzas/fetchPizzas/rejected': state => {
			state.status = Status.ERROR
			state.items = []
		},
	},
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
