import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortPropertyEnum } from './types'

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RAITING_DESC,
	},
}

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategorId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload
		},

		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},

		setSortType: (state, action: PayloadAction<Sort>) => {
			state.sort = action.payload
		},

		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},

		setFilters: (state, action: PayloadAction<FilterSliceState>) => {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
				state.sort = action.payload.sort
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RAITING_DESC,
				}
			}
		},
	},
})

export const {
	setCategorId,
	setSortType,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
