<script setup lang="ts">
</script>

<template>
<div class="container">Please select the bus line first</div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.container {
  @include flex-center();
  width: 100%;
  height:100%;
  min-height: 444px;
  background-color: $primary-white;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%239A9DA4FF' stroke-width='3' stroke-dasharray='22' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 4px;
  font-size: 1.4rem;
  color: $placeholder-color;
}
</style>