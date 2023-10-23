<script setup lang="ts">
import type Movie from "@@/types/Movie";

const props = defineProps<{
  movies: Movie[];
}>();

const emit = defineEmits<{
  (e: "look", value: Movie): void;
}>();
</script>

<template>
  <main class="movies__column column">
    <ul class="column__list">
      <ColumnItemMovies
        v-for="movie in movies"
        :key="movie._id"
        :movie="movie"
        @look="$emit('look', movie)"
      />
    </ul>
  </main>
</template>

<style lang="scss" scoped></style>
