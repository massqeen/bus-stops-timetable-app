<script setup lang="ts">
import { defineProps, watch } from 'vue'
import TimeItem from "@/components/TimeItem.vue";

const props = defineProps<{
  times: string[],
  selectedStopName: string
}>()

const scrollToTop = () => {
  const element = document.querySelector('.time-list-container')
  if (element) {
    element.scrollTop = 0
  }
}

watch(()=>props.times, () => {
  scrollToTop()
})
</script>

<template>
  <div class="time-list-container">
    <h2 class="title">Bus Stop: {{ props.selectedStopName }}</h2>
    <h3 class="list-title">Time</h3>
    <ul class="time-list no-bullets">
      <TimeItem v-for="time in times" :key="time" :time="time"/>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.time-list-container {
  height: 44.4rem;
  padding: 2.4rem 0;
  background-color: $primary-white;
  border-radius: 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  .title {
    padding: 0 2.4rem;
    @include font(1.71, $font-size-sm, 600);
    color: $text-color;

  }

  .list-title {
    padding: 2.4rem;
    @include font(1.71, $font-size-sm-1, 600);
    color: $tab-text-color;
    border-bottom: 1px solid $rectangle-border-dark;
  }
}
</style>
