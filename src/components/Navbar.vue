<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

const scrollHeight = ref(0)
const navBarOpen = ref(false)

onMounted(() => {
	window.addEventListener('scroll', function () {
		scrollHeight.value = window.scrollY
	})
})

const logo = computed(() => {
	return scrollHeight.value >= 700 ? '/logo-alt.svg' : '/logo.svg'
})
</script>

<template>
	<nav class="fixed w-full mx-auto px-3 md:px-0 z-20" :class="{ 'bg-white shadow': scrollHeight >= 700 }">
		<div class="container mx-auto flex justify-between items-center py-3">
			<img :src="logo" alt="Food Now Logo" class="h-10"/>
			<button
				@click="navBarOpen = !navBarOpen"
				type="button"
				class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-amber-600 rounded-lg md:hidden hover:bg-amber-200"
			>
				<svg
					class="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
			<div
				class="hidden lg:flex grow justify-center items-center gap-6"
				:class="{ 'text-white': scrollHeight < 700, 'text-black': scrollHeight >= 700 }"
			>
				<a class="font-bold" href="#">Home</a>
				<a class="font-bold" href="#">Order</a>
				<a class="font-bold" href="#">About</a>
				<a class="font-bold" href="#">Blog</a>
				<a class="font-bold" href="#">Contact Us</a>
			</div>
			<div
				class="hidden lg:flex justify-center items-center gap-6"
				:class="{ 'text-white': scrollHeight < 700, 'text-black': scrollHeight >= 700 }"
			>
				<a class="font-bold" href="#">Login</a>
				<a href="#" class="button button-primary rounded-full !px-6 !text-white">Register</a>
			</div>
		</div>
		<div
			:class="{ hidden: !navBarOpen, flex: navBarOpen }"
			class="rounded-lg flex-col gap-1 bg-white p-3 lg:hidden"
		>
			<a class="hover:bg-gray-200 rounded-lg font-bold px-3 py-2" href="#">Home</a>
			<a class="hover:bg-gray-200 rounded-lg font-bold px-3 py-2" href="#">Order</a>
			<a class="hover:bg-gray-200 rounded-lg font-bold px-3 py-2" href="#">About</a>
			<a class="hover:bg-gray-200 rounded-lg font-bold px-3 py-2" href="#">Blog</a>
			<a class="hover:bg-gray-200 rounded-lg font-bold px-3 py-2" href="#">Contact Us</a>
			<a class="hover:bg-gray-200 rounded-lg font-bold px-3 py-2" href="#">Login</a>
			<a href="#" class="button button-primary rounded-full !px-6 text-center !text-white">Register</a>
		</div>
	</nav>
</template>
