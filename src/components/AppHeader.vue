<script setup lang="ts">
</script>

<template>
  <header class="header">
    <h1 class="title">Timetable</h1>
    <nav class="nav">
      <router-link to="/lines" class="nav-link" :class="{ active: $route.path === '/lines' }">Bus Lines</router-link>
      <router-link to="/stops" class="nav-link" :class="{ active: $route.path === '/stops' }">Stops</router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.header {
  width: 100%;
  margin-bottom: 1.6rem;

  .title {
    margin-bottom: 2.4rem;
    @include font(1.33, $font-size-lg, 600);
    color: $text-color;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  .nav {
    display: flex;
    padding: 0 2.4rem;
    background-color: $primary-white;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    .nav-link {
      padding: 2rem 2.4rem;
      text-decoration: none;
      color: $secondary-color;
      @include font(1.71, $font-size-sm, 500);
      border-bottom: 2px solid transparent;

      &.active {
        border-bottom: 2px solid $primary-color;
        color: $tab-text-color;
      }

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
