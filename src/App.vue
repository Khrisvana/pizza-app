<script setup lang="ts">
import { ref, onMounted, type Ref, computed, watch } from 'vue'

import PizzaList from './assets/json/pizza-list.json'
import SizeList from './assets/json/size-list.json'
import ToppingList from './assets/json/topping-list.json'

import Pizza from './components/Pizza.vue'
import Topping from './components/Topping.vue'

type Pizza = {
	id: number
	name: string
	price: number
	discount: {
		is_active: boolean,
		final_price: number
	}
	toppings: Array<number>
}

type Size = {
	id: number
	name: string
	extra_price: number
}

type Topping = {
	id: number
	name: string
	price: number
}

type FormInputs = {
	pizza: number
	size: number
	toppings: number[]
}

const inputs: Ref<FormInputs> = ref({
	pizza: 1,
	size: 1,
	toppings: []
})

const pizza: Pizza[] = PizzaList.data
const sizes: Size[] = SizeList.data
const toppings: Topping[] = ToppingList.data

const toppingSummary = computed(() => {
	return toppings.filter((item) => {
		return inputs.value.toppings.includes(item.id)
	})
})

const totalPrice = computed(() => {
	let filteredPizza: Pizza = pizza.filter((item) => item.id == inputs.value.pizza)[0] ?? []
	let filteredSize: Size = sizes.filter((item) => item.id == inputs.value.size)[0] ?? []
	let toppingTotal: number = toppingSummary.value.reduce((accumulator, value) => {
		return accumulator + value.price
	}, 0)

	let total = filteredPizza.discount.is_active ? filteredPizza.discount.final_price : filteredPizza.price

	total += filteredSize.extra_price + toppingTotal

	return {
		raw: total,
		formatted: new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(total)
	} 
})

const availableTopping = computed(() => {
	let filteredPizza: Pizza = pizza.filter((item) => item.id == inputs.value.pizza)[0] ?? []

	return filteredPizza.toppings
})

const formatSizeName = (name: string, price: number) => {
	let formattedPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(price)

	if (price > 0) return `${name} (+${formattedPrice})`

	return name
}

watch(() => inputs.value.pizza, (value) => {
  inputs.value.toppings = []
  inputs.value.size = 1
}, { deep : true})


onMounted(() => {
	console.log(1)
})
</script>

<template>
	<div class="container flex flex-wrap gap-3 mx-auto px-3">
		<div>
			<h1 class="h1">Choose your pizza</h1>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
				<Pizza
					:pizza="item"
					v-model="inputs.pizza"
					v-for="item in pizza"
					:key="item.id"
				/>
			</div>
			<h1 class="h1">Custom Pizza</h1>

			<h5 class="h5">Size</h5>
			<div class="flex flex-wrap gap-3 mb-5">
				<div class="form-check" v-for="size in sizes" :key="size.id">
					<input
						type="radio"
						name="pizza_size"
						:value="size.id"
						:id="`radioman-${size.id}`"
						class="form-radio"
						v-model="inputs.size"
					/>
					<label class="cursor-pointer" :for="`radioman-${size.id}`">{{
						formatSizeName(size.name, size.extra_price)
					}}</label>
				</div>
			</div>

			<h5 class="h5">Toppings</h5>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
				<Topping
					:listed-topping="availableTopping"
					:topping="topping"
					v-model="inputs.toppings"
					v-for="topping in toppings"
					:key="topping.id"
				/>
			</div>
		</div>
		<div class="w-max">
			Card Here
			<pre>
				{{ inputs }}
				{{ totalPrice.formatted }}
			</pre
			>
		</div>
	</div>
</template>
