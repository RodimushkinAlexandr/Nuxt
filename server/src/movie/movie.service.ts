import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie-schema';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';
import { GroupMovieDto } from './dto/group-movie.dto';
import { async } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private moviesService: Model<MovieDocument>,
  ) {}

  async getAllMovies() {
    const movies = await this.moviesService.find();
    return movies;
  }

  async getPaginatedFilms(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const films = await this.moviesService
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    return films;
  }

  async getOneMovie(id: string): Promise<Movie> {
    const movie = await this.moviesService.findById(id);
    return movie;
  }

  async deleteOneMovie(id: string): Promise<Movie> {
    const movie = await this.moviesService.findByIdAndDelete(id);
    return movie;
  }

  async searchNameMovie(dto: SearchMovieDto): Promise<Movie[]> {
    return (await this.getAllMovies()).filter(
      (movie) => movie.name.toLowerCase().indexOf(dto.name) >= 0,
    );
  }

  async getFavoritesMovies(moviesID: string[]): Promise<Movie[]> {
    return await Promise.all(
      moviesID.map(
        async (id): Promise<Movie> => await this.getOneMovie(id as string),
      ),
    );
  }

  async getMoviesFilter(dto: FilterMovieDto): Promise<Movie[]> {
    let movies = await this.getAllMovies();

    if (dto.year) movies = movies.filter((movie) => movie.year == dto.year);
    if (dto.genre)
      movies = movies.filter((movie) =>
        movie.genres
          .map((genre) => Object.values(genre).join())
          .includes(dto.genre),
      );
    if (dto.country)
      movies = movies.filter((movie) =>
        movie.countries
          .map((country) => Object.values(country).join())
          .includes(dto.country),
      );

    return movies;
  }

  async getAllFilters(): Promise<object> {
    const movies = await this.getAllMovies();

    const filterGenre = new Set<string>();
    const filterYear = new Set<string>();
    const filterCountries = new Set<string>();

    movies.forEach((item) => {
      item.genres.forEach((filter) => {
        filterGenre.add(Object.values(filter).join());
      });

      item.countries.forEach((filter) => {
        filterCountries.add(Object.values(filter).join());
      });

      filterYear.add(item.year);
    });

    const genres = [...filterGenre];
    const years = [...filterYear].sort((a, b) => Number(b) - Number(a));
    const countries = [...filterCountries];

    const allFilters = {
      genres,
      years,
      countries,
    };

    return allFilters;
  }

  async getMoviesGroup(groupMovieDto: GroupMovieDto) {
    const selectedFilters = await this.randomFilters(
      groupMovieDto.nameFilter,
      groupMovieDto.amountSelected,
    );
    const movies = await this.getAllMovies();
    const finishGroup = {};

    for (const filter of selectedFilters) {
      const listMovies = movies.filter((movie) =>
        movie[groupMovieDto.nameFilter].some(
          (movieFilter) => movieFilter.name === filter,
        ),
      );

      finishGroup[filter] = listMovies.slice(
        0,
        groupMovieDto.amountSelectedLength,
      );
    }

    return finishGroup;
  }

  async randomFilters(
    nameFilter: string,
    amountSelected: number,
  ): Promise<string[]> {
    const filters = await this.getAllFilters();
    const filter = filters[nameFilter];
    const selectedFilters = new Set();

    while (selectedFilters.size < amountSelected) {
      const randomNum = Math.floor(Math.random() * filter.length);
      selectedFilters.add(filter[randomNum]);
    }

    return Array.from(selectedFilters) as string[];
  }

  // async allMov(): Promise<Movie[]> {
  //     const movies = await this.moviesService.insertMany(

  //         )
  //     return }
  // async getAllMoviesAndRemoveDuplicate() {
  //     const movies = await this.moviesService.find()

  //     // let arr = []
  //     // for (let i = 0; i < movies.length; i++) {
  //     //     if(arr.includes(movies[i].name)) {
  //     //         await this.deleteOneMovie(movies[i]._id)
  //     //     } else {
  //     //         arr.push(movies[i].name)
  //     //     }
  //     // }
  //     console.log(movies.length)
  //     return movies;
  // }
}
