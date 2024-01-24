<script setup lang="ts">
import { priceFormat } from '@/utils/numberFormats'
import type { Pizza, Size, Topping } from 'types'

import { ref, onMounted, type Ref, computed, watch } from 'vue'

import PizzaList from './assets/json/pizza-list.json'
import SizeList from './assets/json/size-list.json'
import ToppingList from './assets/json/topping-list.json'

import Navbar from './components/Navbar.vue'
import PizzaInput from './components/PizzaInput.vue'
import ToppingInput from './components/ToppingInput.vue'
import PriceSummary from './components/PriceSummary.vue'

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

const selectedPizza = computed(() => {
	return pizza.filter((item) => {
		return inputs.value.pizza == item.id
	})[0] ?? []
})

const selectedSize = computed(() => {
	return sizes.filter((item) => {
		return inputs.value.size == item.id
	})[0] ?? []
})

const availableTopping = computed(() => {
	let filteredPizza: Pizza = pizza.filter((item) => item.id == inputs.value.pizza)[0] ?? []

	return filteredPizza.toppings
})

watch(() => inputs.value.pizza, (value) => {
  inputs.value.toppings = []
  inputs.value.size = 1
}, { deep : true})


onMounted(() => {
	console.log(1)
})
</script>

<template>
	<div class="hero">
		<Navbar />
		<div class="grow flex justify-center items-center">
			<h1 class="h1 text-amber-600 !mb-0">Pizza order</h1>
		</div>
	</div>
	<div class="container flex gap-6 justify-center mx-auto flex-wrap lg:flex-nowrap">
		<div class="grow">
			<h2 class="h2 text-amber-600">Choose your pizza</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
				<PizzaInput
					:pizza="item"
					v-model="inputs.pizza"
					v-for="item in pizza"
					:key="item.id"
				/>
			</div>
			<h2 class="h2 text-amber-600">Custom Pizza</h2>

			<h5 class="h5 text-gray-600">Size</h5>
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
					<label class="cursor-pointer" :for="`radioman-${size.id}`">
						{{ size.name }} <span class="text-gray-400" v-if="size.extra_price > 0">(+{{ priceFormat(size.extra_price, 0) }})</span>
					</label>
				</div>
			</div>

			<h5 class="h5 text-gray-600">Toppings</h5>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
				<ToppingInput
					:listed-topping="availableTopping"
					:topping="topping"
					v-model="inputs.toppings"
					v-for="topping in toppings"
					:key="topping.id"
				/>
			</div>
		</div>
		<PriceSummary :pizza="selectedPizza" :size="selectedSize" :topping-summary="toppingSummary"/>
	</div>
</template>

<style scoped>
.hero {
	background-image: url('/hero.png');
	height: 738px;
	@apply w-full flex flex-col max-h-screen mb-24;
}
</style>