import React from 'react'
import { messages } from '../i18n/messages'
import { LOCALES } from '../i18n/locales'

type CategoriesProps = {
	value: number
	onClickCategory: (index: number) => void
}

const categories = messages[LOCALES.RUSSIAN].categories

const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, onClickCategory }) => {
		return (
			<div className='categories'>
				<ul>
					{categories.map((categoryName, i) => (
						<li
							key={i}
							onClick={() => onClickCategory(i)}
							className={value === i ? 'active' : ''}
						>
							{categoryName}
						</li>
					))}
				</ul>
			</div>
		)
	}
)

export default Categories
