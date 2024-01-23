export type Pizza = {
	id: number
	name: string
	price: number
	discount: {
		is_active: boolean,
		final_price: number
	}
	toppings: Array<number>
}

export type Size = {
	id: number
	name: string
	extra_price: number
}

export type Topping = {
	id: number
	name: string
	price: number
}