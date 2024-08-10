<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { BusStop } from '@/store'
import SortableBusStopList from "@/components/SortableBusStopList.vue";

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

const handleSelectStop = (stop: BusStop) => {
  emit('stopSelected', stop)
}

watch(() => props.stops, (newStops) => {
  sortedBusStops.value = [...newStops].sort((a, b) => a.order - b.order)
}, { immediate: true })
</script>

<template>
  <div class="line-stops">
    <h2 class="title">Bus Line: {{ props.selectedLineNumber }}</h2>
    <SortableBusStopList :is-selectable="true"
                 :stops="sortedBusStops"
                 :is-ascending="isAscending"
                 @stop-selected="handleSelectStop"
                 @sort-stops="sortStopsByOrder"
    />
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
}
</style>
