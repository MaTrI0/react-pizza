import { cartItem } from '../redux/cart/types'

export const calcTotalPrice = (items: cartItem[]) => {
	return items.reduce((sum, obj) => {
		return obj.price * obj.count + sum
	}, 0)
}
