<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { BusStop } from '@/store'

const props = defineProps<{ stop: BusStop }>()
const emit = defineEmits<{
  (e: 'stopSelected', stop: BusStop): void
}>()


const selectStop = () => {
  emit('stopSelected', props.stop)
}
</script>

<template>
  <li @click="selectStop" class="bus-stop-item">{{ stop.stop }}</li>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.bus-stop-item {
  padding: 2rem 2.4rem;
  cursor: pointer;
  transition: background-color 0.3s;
  @include font(1.33, $font-size-sm-1, 400);
  color: $tab-text-color;
  user-select: none;

  &:not(:last-child) {
    border-bottom: 1px solid $rectangle-border-light;
  }

  &:hover {
    background-color: $fill-light-grey;
  }
}
</style>
