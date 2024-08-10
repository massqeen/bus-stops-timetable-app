<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore, BusStop } from '@/store'
import BusStopItem from '@/components/BusStopItem.vue'

const store = useStore()
const busStops = ref<BusStop[]>([])

onMounted(async () => {
  const selectedLineId = 1 // use real value of lineId
  await store.dispatch('fetchBusStops', selectedLineId)
  busStops.value = store.state.busStops
})

const selectStop = (stop: BusStop) => {
  // handle stop selection
  console.log('stop', stop)
}
</script>

<template>
  <div class="bus-stops">
    <h1 class="title">Timetable</h1>
    <nav class="nav">
      <router-link to="/" class="nav-link">Bus Lines</router-link>
      <router-link to="/stops" class="nav-link">Stops</router-link>
    </nav>
    <div v-if="busStops.length > 0">
      <BusStopItem v-for="stop in busStops" :key="stop.id" :stop="stop" @stopSelected="selectStop" />
    </div>
    <div v-else class="placeholder">
      Please select the bus stop first
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.bus-stops {
  padding: $padding;

  .title {
    font-size: $font-size-lg;
    margin-bottom: $padding;
  }

  .nav {
    margin-bottom: $padding;

    .nav-link {
      margin-right: $margin-right;
      text-decoration: none;
      color: $primary-color;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .placeholder {
    font-size: $font-size-md;
    color: $secondary-color;
  }
}
</style>
