<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import { useStore } from '@/store'
import BusLineItem from '@/components/BusLineItem.vue'
import { BusLine } from '@/store'

const emit = defineEmits(['lineSelected'])
const store = useStore()
const busLines = ref<BusLine[]>([])
const selectedLine = ref<BusLine | null>(null)

onMounted(async () => {
  await store.dispatch('fetchBusLines')
  busLines.value = store.state.busLines
})

const handleSelectLine = (line: BusLine) => {
  emit('lineSelected', line)
  selectedLine.value = line
}
</script>

<template>
  <div class="bus-lines">
    <div class="line-selection">
      <h2 class="title">Select Bus Line</h2>
      <div class="lines-list">
        <BusLineItem v-for="line in busLines"
                     :key="line.id"
                     :line="line"
                     :isActive="line.id === selectedLine?.id"
                     @lineSelected="handleSelectLine"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.bus-lines {
  width: 100%;
  padding: 2.4rem;
  border-radius: 4px;
  background-color: $primary-white;

  .line-selection {
    .title {
      margin-bottom: 0.8rem;
      color: $text-color;
      @include font(1.71, $font-size-sm, 600);
    }

    .lines-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;
    }
  }
}
</style>
