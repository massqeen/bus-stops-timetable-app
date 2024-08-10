<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import SortIcon from '@/components/icons/SortIcon.vue'
import { BusStop } from '@/store'
import BusStopList from "@/components/BusStopList.vue";

const props = defineProps<{ stops: BusStop[], selectedLineNumber: number }>()
const emit = defineEmits<{
  (e: 'stopSelected', stop: BusStop): void
}>()

const sortedBusStops = ref([...props.stops])
const isAscending = ref(true)

const sortStopsByOrder = () => {
  if (isAscending.value) {
    sortedBusStops.value.sort((a, b) => b.order - a.order)
  } else {
    sortedBusStops.value.sort((a, b) => a.order - b.order)
  }
  isAscending.value = !isAscending.value
}

const selectStop = (stop: BusStop) => {
  emit('stopSelected', stop)
}

watch(() => props.stops, (newStops) => {
  sortedBusStops.value = [...newStops].sort((a, b) => a.order - b.order)
}, { immediate: true })
</script>

<template>
  <div class="line-stops">
    <h2 class="title">Bus Line: {{ props.selectedLineNumber }}</h2>
    <div class="sorting-wrapper">
      <p class="sorting">Bus Stops</p>
      <button class="sorting-button" @click="sortStopsByOrder">
        <SortIcon :isSortedAsc="isAscending" />
      </button>
    </div>
    <BusStopList :is-clickable="true" :stops="sortedBusStops" @stopSelected="selectStop" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.line-stops {
  height: 44.4rem;
  padding: 2.4rem 0;
  background-color: $primary-white;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }

  .title {
    padding: 0 2.4rem;
    @include font(1.71, $font-size-sm, 600);
    color: $text-color;
  }

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
}
</style>
