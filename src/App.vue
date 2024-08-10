<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '@/store'
import DetailsPlaceholder from '@/components/DetailsPlaceholder.vue'
import BusLineStopList from '@/components/BusLineStopList.vue'
import TimeList from '@/components/TimeList.vue'
import { BusLine,BusStop } from '@/store'
import '@/styles/main.scss'

const store = useStore()
const selectedLine = ref<BusLine | null>(null)
const selectedStop = ref<BusStop | null>(null)
const timesForSelectedStop = ref<string[]>([])
const busStopsForSelectedLine = ref<BusStop[]>([])

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
  <div id="app" class="app-container">
    <header class="header">
      <h1 class="title">Timetable</h1>
      <nav class="nav">
        <router-link to="/lines" class="nav-link" :class="{ active: $route.path === '/lines' }">Bus Lines</router-link>
        <router-link to="/stops" class="nav-link" :class="{ active: $route.path === '/stops' }">Stops</router-link>
      </nav>
    </header>
    <main class="main">
      <router-view @lineSelected="handleLineSelected"/>
      <DetailsPlaceholder v-if="!selectedLine">Please select the bus line first</DetailsPlaceholder>
      <BusLineStopList v-else :stops="busStopsForSelectedLine" :selected-line-number="selectedLine.id" @stopSelected="handleStopSelected"/>
      <DetailsPlaceholder v-if="!selectedStop">Please select the bus stop first</DetailsPlaceholder>
      <TimeList v-else :times="timesForSelectedStop" :selected-stop-name="selectedStop.stop"/>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.app-container {
  min-height: 100vh;
  padding: 4rem 3.2rem;

  background-color: $background-color;
  font-family: $font-family;

  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-column-gap: 1.6rem;
    grid-row-gap: 1.6rem;
    align-items: self-start;
    grid-template-areas: 'busLines busLines'
                         'stops     lines';
    width: 100%;
  }

  .bus-lines {
    grid-area: busLines;
  }

  .placeholder-stops, .line-stops {
    grid-area: stops;
  }

  .placeholder-lines {
    grid-area: lines;
  }
}

.header {
  width: 100%;
  margin-bottom: 1.6rem;

  .title {
    margin-bottom: 2.4rem;
    @include font(1.33, $font-size-lg, 600);
    color: $text-color;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  .nav {
    display: flex;
    padding: 0 2.4rem;
    background-color: $primary-white;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    .nav-link {
      padding: 2rem 2.4rem;
      text-decoration: none;
      color: $secondary-color;
      @include font(1.71, $font-size-sm, 500);
      border-bottom: 2px solid transparent;

      &.active {
        border-bottom: 2px solid $primary-color;
        color: $tab-text-color;
      }

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
