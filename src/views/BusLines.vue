<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'
import BusLineItem from '@/components/BusLineItem.vue'
import { BusLine } from '@/store'

const store = useStore()
const busLines = ref<BusLine[]>([])

onMounted(async () => {
  await store.dispatch('fetchBusLines')
  busLines.value = store.state.busLines
})

const selectLine = (line: BusLine) => {
  // handle line selection
  console.log('line', line)
}
</script>

<template>
  <div class="bus-lines">
    <h1 class="title">Timetable</h1>
    <nav class="nav">
      <router-link to="/" class="nav-link">Bus Lines</router-link>
      <router-link to="/stops" class="nav-link">Stops</router-link>
    </nav>
    <div v-if="busLines.length > 0">
      <BusLineItem v-for="line in busLines" :key="line.id" :line="line" @lineSelected="selectLine" />
    </div>
    <div v-else class="placeholder">
      Please select the bus line first
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.bus-lines {
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
