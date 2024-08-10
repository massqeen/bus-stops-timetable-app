<script setup lang="ts">
</script>

<template>
  <main class="main">
    <router-view />
  </main>
</template>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

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

.bus-lines-list-wrapper {
  grid-area: busLines;
}

.placeholder-stops, .line-stops {
  grid-area: stops;
}

.placeholder-lines {
  grid-area: lines;
}
</style>
