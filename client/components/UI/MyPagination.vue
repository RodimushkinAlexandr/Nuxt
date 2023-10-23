<script setup lang="ts">
const props = defineProps<{
  totalPage: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "choosePage", value: number): void;
}>();
</script>

<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li
        class="pagination__item"
        v-for="page in totalPage"
        @click="emit('choosePage', page)"
        :class="{ current: currentPage === page }"
      >
        <p>{{ page }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.pagination {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3px;
  }

  &__item {
    background-color: rgba(51, 51, 51, 0.5);
    padding: 5px;
    border-radius: 8px;
    width: 28px;
    display: flex;
    justify-content: center;
    align-content: center;
    cursor: pointer;

    &.current {
      background-color: #2c4464;
    }
  }
}
</style>
