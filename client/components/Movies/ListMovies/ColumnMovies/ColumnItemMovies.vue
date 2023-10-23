<script setup lang="ts">
import type Movie from "@@/types/Movie";

const props = defineProps<{
  movie: Movie;
}>();

const emit = defineEmits<{
  (e: "look", value: Movie): void;
}>();

const countries = props.movie.countries.map((country) =>
  Object.values(country)
);
const genres = props.movie.genres.map((genre) => Object.values(genre));
</script>

<template>
  <li class="movies__item">
    <div class="movies__img">
      <img :src="movie.poster[0].previewUrl" alt="No Poster" />
    </div>
    <div class="movies__content">
      <div class="movies__contentText">
        <h2 class="movies__name">{{ movie.name }}</h2>
        <div class="movies__year">
          <p class="movie__content-row">
            Year: <span>{{ movie.year }}</span>
          </p>
        </div>
        <div class="movies__countries">
          <p class="movie__content-row">
            Country: <span>{{ countries.join() }}</span>
          </p>
        </div>
        <div class="movies__genre">
          <p class="movie__content-row">
            Genres: <span>{{ genres.join() }}</span>
          </p>
        </div>
      </div>
      <MyButton
        :mediaPhone="true"
        :hover="'aliceblue'"
        @click="$emit('look', movie)"
        class="movies__btn"
        >Look</MyButton
      >
    </div>
  </li>
</template>

<style lang="scss" scoped>
.movies {
  &__item {
    box-shadow: 0px 5px 30px 2px rgba(0, 0, 0, 0.64);
    background-color: rgba($color: #333333, $alpha: 0.5);

    padding: 7px;
    border-radius: 8px;

    display: flex;
    width: 100%;
    font-size: 16px;
    position: relative;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  &.row {
    display: flex;
  }

  &__img {
    width: 120px;
    border-radius: 6px;
    overflow: hidden;
    margin: -5px 0px -5px -5px;
    flex: 0 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    padding: 5px 10px 5px 10px;
    flex: 1 1 auto;

    :not(:last-child) {
      margin-bottom: 8px;
    }
  }
  // .movies__name

  &__name {
    font-size: 21px;
  }

  // .movies__year

  .movie__content-row {
    display: flex;

    span {
      margin-left: 5px;
      word-wrap: break-word;
      word-break: break-word;
    }
  }

  &__genre {
    text-transform: capitalize;
  }

  &__btn {
    position: relative;
    flex: 0 0 auto;
    align-self: flex-end;
  }

  &__favorites {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    &__item {
      font-size: 13px;
    }

    .movies__name {
      font-size: 16px;
    }

    .movies__img {
      width: 90px;
    }
  }
}
</style>
