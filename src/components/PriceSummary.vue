<script setup lang="ts">
import { computed, type Ref, ref } from 'vue';
import { priceFormat, numberFormat } from '@/utils/numberFormats';
import type { Topping } from 'types';

import Modal from '@/components/Modal.vue'

const props = defineProps({
    pizza: {
        type: Object,
        default: {}
    },
    size: {
        type: Object,
        default: {}
    },
    toppingSummary: {
        type: Array<Topping>,
        default: []
    }
})

const modal: any = ref(null)

const totalPrice = computed(() => {
	let toppingTotal: number = props.toppingSummary.reduce((accumulator, value) => {
		return accumulator + value.price
	}, 0)

	let total = props.pizza.discount.is_active ? props.pizza.discount.final_price : props.pizza.price

	total += props.size.extra_price + toppingTotal

	return {
		raw: total,
		formatted: priceFormat(total)
	} 
})
</script>

<template>
    <div class="w-80 grow">
        <div class="bg-white rounded-xl p-6 shadow">
            <h5 class="h5 text-amber-600">Payment Summary</h5>
            <div class="p-2">
                <div class="flex gap-3 justify-between w-full mb-3">
                    <p class="text-gray-600">{{ pizza.name }}</p>
                    <p>{{ numberFormat(pizza.discount.final_price) }} $</p>
                </div>
                <div class="flex gap-3 justify-between w-full mb-3">
                    <p class="text-gray-600">Size - {{ size.name }}</p>
                    <p>{{ numberFormat(size.extra_price) }} $</p>
                </div>
                <div class="flex gap-3 justify-between w-full mb-3" v-for="topping in toppingSummary" :key="topping.id">
                    <p class="text-gray-600">{{ topping.name }}</p>
                    <p>{{ numberFormat(topping.price) }} $</p>
                </div>
            </div>
            <hr>
            <div class="flex gap-3 justify-between w-full my-4">
                <h5 class="h5 !font-normal text-gray-600">Total Price</h5>
                <h5 class="h5 text-amber-600">{{ totalPrice.formatted }}</h5>
            </div>

            <button class="button button-primary w-full rounded-full" @click="modal!.isOpen = true">
                Order Now
            </button>
        </div>
    </div>
	<Modal ref="modal"/>
</template>