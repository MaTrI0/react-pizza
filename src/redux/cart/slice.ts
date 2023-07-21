import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { cartItem, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<cartItem>) => {
			const findItems = state.items.find(obj => obj.id === action.payload.id)

			if (findItems) {
				findItems.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = calcTotalPrice(state.items)
		},

		minusItem: (state, action: PayloadAction<string>) => {
			const findItems = state.items.find(obj => obj.id === action.payload)

			if (findItems && findItems.count > 0) {
				findItems.count--
				state.totalPrice -= findItems.price
			}
		},

		removeItem: (state, action: PayloadAction<string>) => {
			const findItems = state.items.find(obj => obj.id === action.payload)

			if (findItems) {
				state.totalPrice -= findItems.price * findItems.count
				state.items = state.items.filter(obj => obj.id !== action.payload)
			}
		},
		clearItems: state => {
			state.items = []
			state.totalPrice = 0
		},
	},
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
