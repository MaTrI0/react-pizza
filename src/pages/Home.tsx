import React from 'react'
import { useNavigate } from 'react-router-dom'

import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import Skeleton from '../components/PizzaBlock/Skeleton'

import { useSelector } from 'react-redux'

import qs from 'qs'
import { useAppDispatch } from '../redux/store'
import { selecFilter } from '../redux/filter/selectors'
import { setCategorId, setCurrentPage, setFilters } from '../redux/filter/slice'
import { fetchPizzasAction } from '../redux/pizza/asyncActions'
import { SearchPizzaParams } from '../redux/pizza/types'

const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selecFilter)
	const { items, status } = useSelector((state: any) => state.pizzas)

	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategorId(id))
	}, [])

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ``
		const search = searchValue.length > 0 ? `search=${searchValue}` : ``
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'

		dispatch(
			fetchPizzasAction({
				category,
				search,
				sortBy,
				order,
				currentPage: String(currentPage),
			})
		)
	}

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify(
				{
					sortProperty: sort.sortProperty,
					categoryId,
					currentPage,
				},
				{ addQueryPrefix: true }
			)

			navigate(queryString)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage, navigate])

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchPizzaParams

			const sort = sortList.find(obj => obj.sortProperty === params.sortBy)

			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				})
			)
			isSearch.current = true
		}
	}, [])

	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort, searchValue, currentPage])

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} props={_} />
	))

	const pizzas = items
		.filter((obj: any) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true
			}
			return false
		})
		.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onChangeCategory} />
				<Sort sort={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка</h2>
					<p>Запрос не дал ответа. Пожалуйста поворите попытку позднее.</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination onChangePage={onChangePage} />
		</div>
	)
}

export default Home
