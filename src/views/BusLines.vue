<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import BusLineList from "@/components/BusLineList.vue";
import BusLineStopList from '@/components/BusLineStopList.vue'
import DetailsPlaceholder from '@/components/DetailsPlaceholder.vue'
import TimeList from '@/components/TimeList.vue'
import { BusLine,BusStop } from '@/store'

const store = useStore()
const selectedLine = ref<BusLine | null>(null)
const selectedStop = ref<BusStop | null>(null)
const timesForSelectedStop = ref<string[]>([])
const busStopsForSelectedLine = ref<BusStop[]>([])

const isLoading = computed(() => store.state.isLoading)
const error = computed(() => store.state.error)

const handleLineSelected = (line: BusLine) => {
  selectedLine.value = line
  selectedStop.value = null
}

const handleStopSelected = (stop: BusStop) => {
  selectedStop.value = stop
  timesForSelectedStop.value = store.state.busStops
      .filter(s => s.line === selectedLine.value?.id && s.stop === stop.stop)
      .map(s => s.time)
      .sort((a, b) => a.localeCompare(b))
}

watch(selectedLine, (newLine) => {
  if (newLine) {
    const uniqueStops = new Map()
    store.state.busStops.forEach(stop => {
      if (stop.line === newLine.id && !uniqueStops.has(stop.stop)) {
        uniqueStops.set(stop.stop, stop)
      }
    })
    busStopsForSelectedLine.value = Array.from(uniqueStops.values())
  } else {
    busStopsForSelectedLine.value = []
  }
}, { immediate: true })
</script>

<template>
  <div v-if="isLoading" class="loading-container">Loading...</div>
  <div v-if="error" class="error-container">Hello</div>
  <div v-if="!isLoading && !error" class="grid">
    <BusLineList @lineSelected="handleLineSelected"/>
    <DetailsPlaceholder v-if="!selectedLine">Please select the bus line first</DetailsPlaceholder>
    <BusLineStopList v-else :stops="busStopsForSelectedLine" :selected-line-number="selectedLine.id" @stopSelected="handleStopSelected"/>
    <DetailsPlaceholder v-if="!selectedStop">Please select the bus stop first</DetailsPlaceholder>
    <TimeList v-else :times="timesForSelectedStop" :selected-stop-name="selectedStop.stop"/>
  </div>
</template>

<style lang="scss">
@import '@/styles/variables';

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
  align-items: self-start;
  grid-template-areas: 'busLines busLines'
                        'line-stops lines';
}


.bus-lines-list-wrapper {
  grid-area: busLines;
}

.placeholder-stops, .line-stops {
  grid-area: line-stops;
}

.placeholder-lines {
  grid-area: lines;
}

.loading-container, .error-container {
  padding: 2.4rem;
  font-size: $font-size-lg;
}
</style>
