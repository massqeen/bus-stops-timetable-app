<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppMain from "@/components/AppMain.vue";
import '@/styles/main.scss'
</script>

<template>
  <div id="app" class="app-container">
    <AppHeader />
    <AppMain />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.app-container {
  min-height: 100vh;
  padding: 4rem 3.2rem;
  background-color: $background-color;
  font-family: $font-family;
}
</style>
