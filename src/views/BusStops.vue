<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStore, BusStop } from '@/store'
import SortableBusStopList from "@/components/SortableBusStopList.vue";
import SearchInput from "@/components/SearchInput.vue";

const store = useStore()
const busStops = ref<BusStop[]>([])
const sortedBusStops = ref([...busStops.value])
const isAscending = ref(true)

const sortStopsByName = () => {
  if (isAscending.value) {
    sortedBusStops.value.sort((a, b) => b.stop.localeCompare(a.stop))
  } else {
    sortedBusStops.value.sort((a, b) => a.stop.localeCompare(b.stop))
  }
  isAscending.value = !isAscending.value
}

watch(busStops, (newStops) => {
  if (!newStops) return
  sortedBusStops.value = [...newStops].sort((a, b) => a.stop.localeCompare(b.stop))
}, { immediate: true })

onMounted(async () => {
  await store.dispatch('fetchBusStops')
  const uniqueStops = new Map()
  store.state.busStops.forEach(stop => {
    if (!uniqueStops.has(stop.stop)) {
      uniqueStops.set(stop.stop, stop)
    }
  })
  busStops.value = Array.from(uniqueStops.values())
})
</script>

<template>
  <div class="stops">
    <div class="search-input-container">
      <SearchInput placeholder="Search..." />
    </div>
    <SortableBusStopList :is-selectable="false"
                         :stops="sortedBusStops"
                         :is-ascending="isAscending"
                         @sort-stops="sortStopsByName"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.stops {
  background-color: $primary-white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.search-input-container {
  padding: 0.8rem;
}
</style>
