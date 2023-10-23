import { defineStore } from "pinia";
import api from "../api/axiosClient";
import type Movie from "~/types/Movie";
import type Params from "~/types/Params";

type NullMovie<T> = null | T;

interface UseMovies {
  moviesList: NullMovie<Movie[]>;
  allMovies: NullMovie<Movie[]>;
  movie: NullMovie<Movie>;
  params: Params;
  totalPage: number;
  showLookMovie: boolean;
  searchForWord: string;
  error: string;
}

export const useMovies = defineStore({
  id: "useMovies",
  state: (): UseMovies => {
    return {
      moviesList: null,
      movie: null,
      allMovies: null,
      params: {
        page: 1,
        limit: 30,
      },
      totalPage: 17,
      showLookMovie: false,
      searchForWord: "",
      error: "",
    };
  },
  actions: {
    async getMoviesPages(): Promise<void> {
      try {
        this.moviesList = null;
        const data = await api.get("movie/page", {
          params: this.params,
        });
        if (data.data.length) {
          this.moviesList = [...data.data];
        } else {
          this.error = "Sorry, we didn't find anything, please try again";
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getAllMovies(): Promise<void> {
      try {
        const data = await api.get("movie");
        if (data.data.length) {
          this.allMovies = [...data.data];
        }
      } catch (e) {
        console.log(e);
      }
    },
    filterForWord(): void {
      this.moviesList = null;
      if (this.allMovies !== null) {
        const searchCriteria = this.searchForWord.toLowerCase();

        // Сортировка массива фильмов перед фильтрацией
        this.allMovies.sort((a, b) => {
          // Сравниваем, сколько раз критерий встречается в объектах a и b
          const countInA = Object.values(a).filter((value) =>
            this.searchInObject(value, searchCriteria)
          ).length;
          const countInB = Object.values(b).filter((value) =>
            this.searchInObject(value, searchCriteria)
          ).length;

          // Сортируем в порядке убывания частоты появления критерия
          return countInB - countInA;
        });

        // Фильтрация фильмов по критерию
        const filteredMovies = this.allMovies.filter((movie) =>
          this.searchInObject(movie, searchCriteria)
        );

        this.moviesList = filteredMovies;
      }
    },
    searchInObject(obj: any, criteria: string): boolean {
      if (typeof obj === "string") {
        return obj.toLowerCase().includes(criteria.toLowerCase());
      } else if (Array.isArray(obj)) {
        return obj.some((item) => this.searchInObject(item, criteria));
      } else if (typeof obj === "object" && obj !== null) {
        return Object.values(obj).some((value) =>
          this.searchInObject(value, criteria)
        );
      } else {
        return false;
      }
    },
  },
});
