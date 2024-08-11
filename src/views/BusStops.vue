<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useStore, BusStop } from '@/store'
import SortableBusStopList from "@/components/SortableBusStopList.vue";
import SearchInput from "@/components/SearchInput.vue";

const store = useStore()
const busStops = ref<BusStop[]>([])
const sortedBusStops = ref([...busStops.value])
const isAscending = ref(true)
const searchQuery = ref<string>('')

const isLoading = computed(() => store.state.isLoading)
const error = computed(() => store.state.error)
const filteredBusStops = computed(() => {
  if (!searchQuery.value) return sortedBusStops.value
  return sortedBusStops.value.filter(stop =>
      stop.stop.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const updateSearchQuery = (query: string) => {
  searchQuery.value = query
}

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
      <SearchInput placeholder="Search..." @searchQuery="updateSearchQuery"/>
    </div>
    <div v-if="isLoading" class="loading-container">Loading...</div>
    <div v-if="error" class="error-container">{{ error }}</div>
    <SortableBusStopList v-if="!isLoading && !error"
                         :is-selectable="false"
                         :stops="filteredBusStops"
                         :is-ascending="isAscending"
                         @sort-stops="sortStopsByName"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.stops {
  min-height: 83svh;
  background-color: $primary-white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.loading-container, .error-container {
  padding: 2.4rem;
  font-size: $font-size-lg;
}

.search-input-container {
  padding: 0.8rem;
}
</style>
