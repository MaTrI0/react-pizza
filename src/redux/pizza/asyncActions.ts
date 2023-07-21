import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, SearchPizzaParams } from './types'

export const fetchPizzasAction = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizzas/fetchPizzas',
	async params => {
		const { category, search, sortBy, order, currentPage } = params
		const { data } = await axios.get<Pizza[]>(
			`https://63594f2dff3d7bddb99effc4.mockapi.io/api/v1/items?page=${currentPage}&limit=4&${category}&${search}&sortBy=${sortBy}&order=${order}`
		)
		return data
	}
)
