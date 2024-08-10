<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { BusLine } from '@/store'

const props = defineProps<{ line: BusLine }>()
const emits = defineEmits(['lineSelected'])

const selectLine = () => {
  emits('lineSelected', props.line)
}
</script>

<template>
  <div @click="selectLine" class="bus-line-item">{{ line.name }}</div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.bus-line-item {
  cursor: pointer;
  padding: $padding;
  border: 1px solid $primary-color;
  margin-bottom: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: lighten($primary-color, 40%);
  }
}
</style>
