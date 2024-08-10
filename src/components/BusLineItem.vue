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
  <div @click="selectLine" class="bus-line-item">{{ line.id }}</div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.bus-line-item {
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  background-color: $primary-color;
  border-radius: 4px;
  transition: background-color 0.3s;
  @include font(1.33, $font-size-sm-1, 500);
  color: $primary-white;

  &:hover {
    background-color: $primary-color-accent;
  }
}
</style>
