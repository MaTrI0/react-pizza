import { LOCALES } from './locales'
import { SortPropertyEnum } from '../redux/filter/types'

export const messages = {
	[LOCALES.RUSSIAN]: {
		categories: [
			'Все',
			'Мясные',
			'Вегетарианская',
			'Гриль',
			'Острые',
			'Закрытые',
		],
		sortList: [
			{
				name: 'популярности (DESC)',
				sortProperty: SortPropertyEnum.RAITING_DESC,
			},
			{
				name: 'популярности (ASC)',
				sortProperty: SortPropertyEnum.RAITING_ASC,
			},
			{ name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
			{ name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
			{ name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
			{ name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
		],
	},
	[LOCALES.ENGLISH]: {
		categories: ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy', 'Closed'],
	},
	[LOCALES.UKRAINE]: {
		categories: [
			'Все',
			"М'ясні",
			'Вегетаріанська',
			'Гриль',
			'Гострі',
			'Закриті',
		],
	},
}
