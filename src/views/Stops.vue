<script setup lang="ts">
</script>

<template>
  <div class="stops">
    <h1>Timetable</h1>
    <nav>
      <router-link to="/" class="nav-link">Bus Lines</router-link>
      <router-link to="/stops" class="nav-link">Stops</router-link>
    </nav>
    <div class="placeholder">
      Please select the bus stop first
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.stops {
  padding: $padding;

  h1 {
    font-size: $font-size-lg;
    margin-bottom: $padding;
  }

  nav {
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