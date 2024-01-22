<script setup lang="ts">
import { computed, ref } from 'vue'

const model = defineModel<number>({required: true})

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
    },
    pizza: {
        type: Object,
        default: {}
    }
})

const emit = defineEmits(['update:modelValue'])

const formattedPrice = computed(() => {
    let value = props.pizza.price

    if (props.pizza.discount?.is_active) value = props.pizza.discount.price

    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value)
})

const selectPizza = ((id: number) => {
    emit('update:modelValue', id)
})

</script>

<template>
    <div class="rounded p-3 border flex item-center" :class="{'bg-orange-400': model == pizza.id}" @click="selectPizza(pizza.id)">
        <img src="" alt="">
        <div class="">
            <p class="font-bold">{{ pizza.name }}</p>
            <p>{{ formattedPrice }}</p>
        </div>
    </div>
    <input type="radio" class="" name="pizza" :value="pizza.id" v-model="model">
</template>