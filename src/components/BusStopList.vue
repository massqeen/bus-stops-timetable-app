<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import BusStopItem from '@/components/BusStopItem.vue'
import { BusStop } from '@/store'

const props = defineProps<{ stops: BusStop[], isClickable: boolean }>()
const emit = defineEmits<{
  (e: 'stopSelected', stop: BusStop): void
}>()

const selectStop = (stop: BusStop) => {
  if (!props.isClickable) return
  emit('stopSelected', stop)
}
</script>

<template>
    <ul class="stop-list no-bullets">
      <BusStopItem v-for="stop in stops" :key="stop.order" :stop="stop" @click="selectStop(stop)"/>
    </ul>
</template>

<style scoped lang="scss">
</style>
