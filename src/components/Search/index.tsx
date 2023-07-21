import React from 'react'
import debounce from 'lodash.debounce'

import style from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/filter/slice'

const Search: React.FC = () => {
	const dispatch = useDispatch()
	const [value, setValue] = React.useState('')
	const inputRef = React.useRef<HTMLInputElement>(null)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str))
		}, 150),
		[]
	)

	const onClickClearSearch = () => {
		dispatch(setSearchValue(''))

		setValue('')
		inputRef.current?.focus()
	}

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target?.value)
		updateSearchValue(event.target?.value)
	}

	return (
		<div className={style.root}>
			<input
				ref={inputRef}
				value={value}
				onChange={event => onChangeInput(event)}
				className={style.input}
				placeholder='Поиск пиццы...'
			/>
			<svg
				// class='bi bi-search'
				className={style.icon}
				fill='currentColor'
				height='16'
				viewBox='0 0 16 16'
				width='16'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
			</svg>
			{value && (
				<svg
					onClick={() => onClickClearSearch()}
					className={style.clearIcon}
					viewBox='0 0 48 48'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z' />
					<path d='M0 0h48v48h-48z' fill='none' />
				</svg>
			)}
		</div>
	)
}

export default Search
