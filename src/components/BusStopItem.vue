<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  stop: Object,
});

const emits = defineEmits(['stopSelected']);

const selectStop = () => {
  emits('stopSelected', props.stop);
};
</script>

<template>
  <div @click="selectStop" class="bus-stop-item">{{ stop.name }}</div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.bus-stop-item {
  cursor: pointer;
  padding: $padding;
  border: 1px solid $primary-color;
  margin-bottom: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: lighten($primary-color, 40%);
  }
}
</style>