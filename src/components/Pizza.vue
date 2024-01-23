<script setup lang="ts">
import { computed } from 'vue'

let model = defineModel<number>({ required: true })

const props = defineProps({
	pizza: {
		type: Object,
		default: {}
	}
})

const formattedPrice = computed(() => {
	let value = props.pizza.price

	if (props.pizza.discount?.is_active) value = props.pizza.discount.final_price

	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
})

const getImage = ((name: string) => {
    return `/pizza/${name}.png`
})
</script>

<template>
	<label
		:for="`pizza-${pizza.id}`"
		class="pizza-container cursor-pointer"
		:class="{ 'pizza-container-active': model == pizza.id }"
	>
		<img :src="getImage(pizza.name)" :alt="pizza.name" class="pizza-image"/>
		<div>
			<p class="font-bold">{{ pizza.name }}</p>
			<p>{{ formattedPrice }}</p>
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
	@apply rounded-xl hover:bg-orange-200 py-5 px-10 gap-6 border flex items-center justify-items-center;
    transition: all var(--transition-time);
}

.pizza-container-active {
	@apply bg-orange-400 hover:bg-orange-400 text-white;
}

.pizza-image {
    width: 125px;
    height: 125px;
    transition: rotate var(--transition-time);
}

.pizza-container:hover .pizza-image,
.pizza-container-active .pizza-image {
    rotate: 15deg;
}
</style>