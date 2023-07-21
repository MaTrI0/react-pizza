import React from 'react'
import { useDispatch } from 'react-redux'
import { setSortType } from '../redux/filter/slice'
import { Sort, SortPropertyEnum } from '../redux/filter/types'
import { messages } from '../i18n/messages'
import { LOCALES } from '../i18n/locales'

type SortObjectItem = {
	name: string
	sortProperty: SortPropertyEnum
}

export const sortList: SortObjectItem[] = [
	{ name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RAITING_DESC },
	{ name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RAITING_ASC },
	{ name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
	{ name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
	{ name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
	{ name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
]

type SortPopupProps = {
	sort: Sort
}

const SortPopup: React.FC<SortPopupProps> = React.memo(({ sort }) => {
	const dispatch = useDispatch()

	const sortRef = React.useRef<HTMLDivElement>(null)

	const [open, setOpen] = React.useState(false)

	const onClickListItem = (obj: SortObjectItem) => {
		dispatch(setSortType(obj))
		setOpen(false)
	}

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
				setOpen(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => document.body.removeEventListener('click', handleClickOutside)
	}, [])

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<b>Сортировка по:</b>
				<span
					onClick={() => {
						setOpen(!open)
					}}
				>
					{sort.name}
				</span>
			</div>
			{open && (
				<div className='sort__popup'>
					<ul>
						{sortList.map((obj, i) => (
							<li
								key={i}
								onClick={() => onClickListItem(obj)}
								className={
									sort.sortProperty === obj.sortProperty ? 'active' : ''
								}
							>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
})

export default SortPopup
