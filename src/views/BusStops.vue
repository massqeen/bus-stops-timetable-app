<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore, BusStop } from '@/store'
import BusStopItem from '@/components/BusStopItem.vue'

const store = useStore()
const busStops = ref<BusStop[]>([])

onMounted(async () => {
  await store.dispatch('fetchBusStops')
  busStops.value = store.state.busStops
})

const selectStop = (stop: BusStop) => {
  // handle stop selection
  console.log('stop', stop)
}
</script>

<template>
  <div class="stops">
    <div class="stop-selection">
      <h2 class="title">Select Bus Stop</h2>
      <div class="stops-list">
        <BusStopItem v-for="stop in busStops" :key="stop.order" :stop="stop" @stopSelected="selectStop" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.stops {
  .stop-selection {
    .title {
      font-size: $font-size-lg;
    }

    .stops-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
