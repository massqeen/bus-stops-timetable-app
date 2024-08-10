<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { BusStop } from '@/store'

const props = defineProps<{ stop: BusStop }>()
const emits = defineEmits(['stopSelected'])

const selectStop = () => {
  emits('stopSelected', props.stop)
}
</script>

<template>
  <div @click="selectStop" class="bus-stop-item">{{ stop.stop }}</div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.bus-stop-item {
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: lighten($primary-color, 40%);
  }
}
</style>
