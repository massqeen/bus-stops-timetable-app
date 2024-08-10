<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  isSortedAsc: boolean
}>()
</script>

<template>
  <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 0L5.5 3H0.5L3 0Z"
        :fill="props.isSortedAsc ? '#000' : '#9A9DA4'"
    />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 8L5.5 5H0.5L3 8Z"
        :fill="!props.isSortedAsc ? '#000' : '#9A9DA4'"
    />
  </svg>
</template>

<style scoped>
svg {
  cursor: pointer;
}
</style>
