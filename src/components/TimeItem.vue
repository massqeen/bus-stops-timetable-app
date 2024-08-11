<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ time: string }>()
</script>

<template>
  <li class="time-item">{{ time }}</li>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.time-item {
  padding: 2rem 2.4rem;
  @include font(1.33, $font-size-sm-1, 400);
  color: $tab-text-color;
  user-select: none;

  &:not(:last-child) {
    border-bottom: 1px solid $rectangle-border-light;
  }
}
</style>
