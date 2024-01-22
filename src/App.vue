<script setup lang="ts">
import Pizza from './components/Pizza.vue';
import { ref } from 'vue';

const value = ref(1)
const valueSe = ref(null)

const pizza = {
  id: 1,
  name: 'Test',
  price: 100
}

const pizza2 = {
  id: 2,
  name: 'Test',
  price: 100
}


</script>

<template>
  <div class="w-full">
    <div class="container mx-auto px-3">
      <h1 class="text-orange-500">Choose Pizza</h1>
      <Pizza :pizza="pizza" v-model="value"/>
      <Pizza :pizza="pizza2" v-model="value"/>
      <button class="button button-primary">test</button>
    </div>
  </div>
</template>