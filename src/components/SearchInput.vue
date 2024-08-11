<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue'

const props = defineProps<{
  placeholder: string
}>()

const emit = defineEmits<{
  (e:'searchQuery', query: string): void,
}>()
const searchQuery = ref<string>('')

function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

const emitDebouncedInput = debounce((query: string) => {
  emit('searchQuery', query.trim())
}, 500)

watch(searchQuery, (newQuery) => {
  emitDebouncedInput(newQuery)
})

const onInput = () => {
  emitDebouncedInput(searchQuery.value)
}
</script>

<template>
  <div class="search-container">
    <input
        class="input"
        type="text"
        :placeholder="props.placeholder"
        v-model="searchQuery"
        @input="onInput"
    />
    <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.83325 7.33337C1.83325 4.29581 4.29569 1.83337 7.33325 1.83337C10.3708 1.83337 12.8333 4.29581 12.8333 7.33337C12.8333 10.3709 10.3708 12.8334 7.33325 12.8334C4.29569 12.8334 1.83325 10.3709 1.83325 7.33337ZM7.33325 0.833374C3.7434 0.833374 0.833252 3.74352 0.833252 7.33337C0.833252 10.9232 3.7434 13.8334 7.33325 13.8334C8.9482 13.8334 10.4256 13.2444 11.5624 12.2696L13.6464 14.3536C13.8416 14.5489 14.1582 14.5489 14.3535 14.3536C14.5487 14.1583 14.5487 13.8418 14.3535 13.6465L12.2695 11.5625C13.2443 10.4257 13.8333 8.94832 13.8333 7.33337C13.8333 3.74352 10.9231 0.833374 7.33325 0.833374Z"
          fill="#9A9DA4"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';
@import '@/styles/mixins';

.search-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 1.2rem 1.6rem;
  gap: 8px;
  width: 288px;
  height: 40px;
  background: $primary-white;
  border: 1px solid $rectangle-border-dark;
  border-radius: 4px;

  .search-icon path {
    fill: $secondary-color;
  }

  &:focus-within {
    border-color: $primary-color;

    .search-icon path {
      fill: $primary-color;
    }
  }
}

.input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 0;
  font-family: $font-family;
  @include font(1.14, $font-size-sm-1, 400);
  color: $text-color;

  &::placeholder {
    font-family: $font-family;
    @include font(1.14, $font-size-sm-1, 400);
    color: $secondary-color;
  }
}

svg {
  cursor: pointer;
}
</style>
