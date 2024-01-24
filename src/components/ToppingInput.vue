<script setup lang="ts">
let model = defineModel<number[]>({ required: true })

const props = defineProps({
	topping: {
		type: Object,
		default: {}
	},
    listedTopping: {
        type: Array,
        default: []
    }
})

const isAvailable = (id: number) => {
    return props.listedTopping.includes(id)
}
</script>

<template>
	<label
		:for="`topping-${topping.id}`"
		class="text-center cursor-pointer rounded-full min-w-24 button button-outline-primary"
		:class="{ 'button-outline-primary--active': model.includes(topping.id), 'button-outline-primary--disabled': !isAvailable(topping.id) }"
		tabindex="0"
	>
		{{ topping.name }}
	</label>
	<input
		type="checkbox"
		name="topping"
		:id="`topping-${topping.id}`"
		class="hidden"
		:value="topping.id"
		v-model="model"
        :disabled="!isAvailable(topping.id)"
	/>
</template>
