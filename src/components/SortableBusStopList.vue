<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import BusStopItem from '@/components/BusStopItem.vue'
import SortIcon from "@/components/icons/SortIcon.vue";
import { BusStop } from '@/store'

const props = defineProps<{ stops: BusStop[], isSelectable: boolean, isAscending: boolean}>()
const emit = defineEmits<{
  (e: 'stopSelected', stop: BusStop): void,
  (e: 'sortStops'): void
}>()

const handleSorting = () => {
  emit('sortStops')
}

const handleSelectStop = (stop: BusStop) => {
  if (!props.isSelectable) return
  emit('stopSelected', stop)
}
</script>

<template>
  <div class="sorting-wrapper">
    <p class="sorting">Bus Stops</p>
    <button class="sorting-button" @click="handleSorting">
      <SortIcon :isSortedAsc="isAscending" />
    </button>
  </div>
  <ul class="stop-list no-bullets">
      <BusStopItem v-for="stop in stops"
                   :key="stop.stop" :stop="stop"
                   :is-selectable="props.isSelectable"
                   @click="handleSelectStop(stop)"
      />
  </ul>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.sorting-wrapper {
  display: flex;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid $rectangle-border-dark;
}

.sorting {
  @include font(1.71, $font-size-sm-1, 600);
  color: $tab-text-color;
}

.sorting-button {
  background: none;
  border: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
}
</style>
