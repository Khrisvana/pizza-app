<script setup lang="ts">
import { ref, type Ref } from 'vue'
const isOpen = ref(false)
const modal: Ref<any> = ref(null)

const clickedOutside = ((event: any) => {
    if (event.target.contains(modal.value)){
        isOpen.value = false
    }
})

defineExpose({
    isOpen
})
</script>

<template>
	<div
		@click="clickedOutside"
		:class="{ hidden: !isOpen, flex: isOpen }"
		id="default-modal"
		tabindex="-1"
		aria-hidden="true"
		class="overflow-y-auto bg-black/25 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full"
	>
		<div class="relative p-4 w-full w-max" ref="modal">
			<div class="relative bg-white rounded-lg shadow">
				<div class="p-4 md:p-5 space-y-4">
					<h4 class="h4 text-center">Order Success</h4>
					<p class="text-center">
						Thank you, we have recieved your <br />
						order successfully.
					</p>

					<button class="button button-primary w-full rounded-full" @click="isOpen = false">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>
