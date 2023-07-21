/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizzaInfo: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string
		title: string
		rating: number
		price: number
	}>()
	const { id } = useParams()
	const navigate = useNavigate()

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://63594f2dff3d7bddb99effc4.mockapi.io/api/v1/items/${id}`
				)
				setPizza(data)
			} catch (err) {
				alert(`Произошла ошибка: ${err}`)
				navigate('/')
			}
		}
		fetchPizza()
	}, [])

	if (!pizza) {
		return <>Loading...</>
	}

	return (
		<div className='pizza-block__full-info'>
			<img className='pizza-block__image2' src={pizza.imageUrl} />
			<h4>{pizza.title}</h4>
			<h4>Рейтинг: {pizza.rating}</h4>
			<h4>Цена: {pizza.price} ₽</h4>

			<div className='cart cart--empty'>
				<Link to='/' className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</div>
	)
}

export default FullPizzaInfo
