<script setup lang="ts">
import { useMovies } from "@@/stores/useMovies";
import type Movie from "@@/types/Movie";

const moviesStore = useMovies();
moviesStore.getMoviesPages();

//Было написано сделать поиск на Клиенте, нативно получаем все фильмы
moviesStore.getAllMovies();

const look = (movie: Movie) => {
  moviesStore.movie = movie;
  moviesStore.showLookMovie = true;
};

const isColumn = ref<boolean>(false);

const choosePage = (page: number) => {
  moviesStore.params.page = page;
  moviesStore.getMoviesPages();
};

watchEffect(() => {
  if (moviesStore.searchForWord.length === 0) {
    moviesStore.getMoviesPages();
  }
});
</script>

<template>
  <div class="movies">
    <header class="movies__header">
      <MyForm
        v-model="moviesStore.searchForWord"
        @search="moviesStore.filterForWord"
        class="movies__form"
      />
      <MyToggle v-model:isColumn="isColumn" class="movies__toggle" />
    </header>
    <transition-group tag="main" name="moviesList" class="movies__main">
      <GridListMovies
        :movies="moviesStore.moviesList"
        v-if="!isColumn && moviesStore.moviesList !== null"
        @look="look"
      />
      <ColumnListMovies
        :movies="moviesStore.moviesList"
        v-else-if="isColumn && moviesStore.moviesList !== null"
        @look="look"
      />
      <LoaderSpinner v-else />
    </transition-group>
    <footer class="movies__footer">
      <MyPagination
        :totalPage="moviesStore.totalPage"
        :currentPage="moviesStore.params.page"
        @choosePage="choosePage"
        v-if="moviesStore.moviesList && !moviesStore.searchForWord"
      />
    </footer>
    <DialogWindow v-model:show="moviesStore.showLookMovie">
      <ShowOneMovie v-if="moviesStore.movie" :movie="moviesStore.movie" />
    </DialogWindow>
  </div>
</template>

<style lang="scss">
.movies {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 25px 0px 0px 0px;
  &__form {
    margin-bottom: 20px;
  }

  &__toggle {
    align-self: flex-end;
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
  }

  .movies__main {
    width: 100%;
  }
  .movies__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__footer {
    padding: 20px 0px;
  }
}

.moviesList-enter-active {
  transition: all 0.1s ease 0.4s;
}
.moviesList-leave-active {
  transition: all ease 0.4s;
}
.moviesList-enter-from,
.moviesList-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
