<script setup lang="ts">
import { priceFormat } from '@/utils/numberFormats'
import { computed } from 'vue'

let model = defineModel<number>({ required: true })

const props = defineProps({
	pizza: {
		type: Object,
		default: {}
	}
})

const pizzaPrice = computed(() => {
	let value: number = props.pizza.price

	if (props.pizza.discount?.is_active) value = props.pizza.discount.final_price

	return {
		price: priceFormat(props.pizza.price),
		final_price: priceFormat(value)
	}
})

const getImage = (name: string) => {
	return `/pizza/${name}.png`
}
</script>

<template>
	<label
		:for="`pizza-${pizza.id}`"
		class="pizza-container cursor-pointer"
		:class="{ 'pizza-container-active': model == pizza.id }"
	>
		<img
			src="/ribbon.svg"
			alt="Discount Offer"
			class="pizza-ribbon"
			v-if="pizza.discount?.is_active"
		/>
		<img :src="getImage(pizza.name)" :alt="pizza.name" class="pizza-image" />
		<div>
			<p class="font-bold">{{ pizza.name }}</p>
			<div class="flex flex-wrap gap-3">
				<p>{{ pizzaPrice.final_price }}</p>
				<p
					v-if="pizzaPrice.final_price != pizzaPrice.price"
					class="pizza-original-price"
					:class="{ 'pizza-original-price-active': model == pizza.id }"
				>
					{{ pizzaPrice.price }}
				</p>
			</div>
		</div>
	</label>
	<input
		type="radio"
		class="hidden"
		name="pizza"
		:value="pizza.id"
		v-model="model"
		:id="`pizza-${pizza.id}`"
	/>
</template>

<style scoped>
.pizza-container {
	@apply relative rounded-xl hover:bg-orange-200 py-5 px-10 gap-6 border flex items-center justify-items-center hover:border-orange-200;
	transition: all var(--transition-time);
}

.pizza-container-active {
	@apply bg-orange-400 hover:bg-orange-400 text-white border-orange-400 hover:border-orange-400;
}

.pizza-image {
	width: 125px;
	height: 125px;
	transition: rotate var(--transition-time);
}

.pizza-ribbon {
	width: 115px;
	position: absolute;
	transform: translateX(-100%);
	top: 0;
	left: 100%;
	right: 0;
}

.pizza-original-price {
	@apply text-gray-400 decoration-gray-400 line-through;
}

.pizza-original-price-active {
	@apply text-gray-300 decoration-gray-300;
}

.pizza-container:hover .pizza-image,
.pizza-container-active .pizza-image {
	rotate: 15deg;
}
</style>