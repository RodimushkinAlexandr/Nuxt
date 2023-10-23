<script setup lang="ts">
import type Movie from "@@/types/Movie";

const props = defineProps<{
  movie: Movie;
}>();

const countries = props.movie.countries
  .map((country: {}) => Object.values(country))
  .join(",");
const genres = props.movie.genres
  .map((genre: {}) => Object.values(genre))
  .join(",");
</script>

<template>
  <div class="movie" v-if="movie?._id">
    <div class="movie__bloks">
      <section class="movie__block img">
        <div
          class="movie__img"
          :style="{
            'background-image': 'url(' + movie.poster[0].previewUrl + ')',
          }"
        ></div>
      </section>
      <section class="movie__block info">
        <h2 class="movie__name">{{ movie.name }}</h2>
        <p class="movie__genres info__margin">Genre: {{ genres }}</p>
        <p class="movie__year info__margin">Year: {{ movie.year }}</p>
        <p class="movie__countries info__margin">Country: {{ countries }}</p>
        <p class="movie__description">{{ movie.description }}</p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie {
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  // .movie__bloks
  .movies__favorites {
    position: absolute;
    top: -20px;
    right: 45px;
    cursor: pointer;
  }
  &__bloks {
    width: 100%;
    height: 100%;
    display: flex;
  }

  // .movie__block

  &__block {
    &:not(:last-child) {
      margin-right: 10px;
    }
    &.info {
      margin-top: 10px;
    }

    &.img {
      .movie__img {
        border-radius: 12px;
      }
    }
  }

  p {
    word-break: break-all;
  }

  .info__margin {
    display: flex;
    text-transform: capitalize;
    flex-direction: row;

    &:not(:last-child) {
      margin-bottom: 13px;
    }
  }
  // .movie__img

  &__img {
    width: 300px;
    height: 441px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  // .movie__name

  &__name {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  // .movie__description

  &__description {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .movie {
    // .movie__bloks

    &__bloks {
      margin: 0px;
      font-size: 14px;
      display: block;
    }

    &__block {
      &.info {
        margin-top: 5px;
      }
    }

    // .movie__block

    &__img {
      width: 200px;
      height: 300px;
      margin: 0px 6px 6px 0px;
      float: left;
    }

    .info__margin {
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    // .movie__name
    &__name {
      font-size: 17px;
      font-weight: 600;
    }

    // .movie__description

    &__description {
      font-size: 14px;
      font-weight: 400;
    }
    // .movie__where
  }
}

@media (max-width: 480px) {
  .movie {
    &__img {
      width: 120px;
      height: 240px;
    }
  }
}
</style>
