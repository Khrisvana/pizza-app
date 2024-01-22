<script setup lang="ts">
// import json later
import PizzaList from './assets/json/pizza-list.json'
import SizeList from './assets/json/size-list.json'

type Pizza = {
	id: number
	name: string
	price: number
	discount: Object
	toppings: Array<number>
}

type Size = {
	id: number,
	name: string,
	extra_price: number
}

import Pizza from './components/Pizza.vue'
import { ref, onMounted } from 'vue'

const value = ref(1)
const pizza: Pizza[] = PizzaList.data
const sizes: Size[] = SizeList.data

const formatSizeName = ((name: string, price: number) => {
	let formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(price)

	if (price > 0) return `${name} (+${formattedPrice})`

	return name
})

onMounted(() => {
	console.log(1)
})
</script>

<template>
	<div class="w-full">
		<div class="container flex gap-3 mx-auto px-3">
			<div>
				<h1 class="h1">Choose your pizza</h1>
				<div class="flex gap-6">
					<Pizza :pizza="item" v-model="value" v-for="item in pizza" :key="item.id" />
				</div>
				<h1 class="h1">Custom Pizza</h1>
				
				<h5 class="h5">Size</h5>
				<div class="flex gap-3">
					<div class="form-check" v-for="size in sizes" :key="size.id">
						<input type="radio" name="pizza_size" :value="size.id" :id="`radioman-${size.id}`" class="form-radio">
						<label :for="`radioman-${size.id}`">{{ formatSizeName(size.name, size.extra_price) }}</label>
					</div>
				</div>

				<h5 class="h5">Toppings</h5>
				<div class="flex flex-wrap">
					btn here
				</div>
			</div>
			<div>
				Card Here
			</div>
		</div>
	</div>
</template>
