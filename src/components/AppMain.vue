<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute()
</script>

<template>
  <main class="main" :class="route.path === '/lines' ? 'grid' : ''">
    <router-view />
  </main>
</template>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.main {
  width: 100%;

  &.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-column-gap: 1.6rem;
    grid-row-gap: 1.6rem;
    align-items: self-start;
    grid-template-areas: 'busLines busLines'
                        'line-stops lines';
  }
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
</style>
