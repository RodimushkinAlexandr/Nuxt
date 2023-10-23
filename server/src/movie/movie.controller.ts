import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FilterMovieDto } from './dto/filter-movie.dto';
import { SearchMovieDto } from './dto/search-movie.dto';
import { GroupMovieDto } from './dto/group-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAllMovies() {
    return await this.movieService.getAllMovies();
  }

  @Get('/page')
  async getFilms(@Query('page') page = 1, @Query('limit') limit = 60) {
    return this.movieService.getPaginatedFilms(page, limit);
  }

  @Get('/filter')
  async getFilterMovies(@Query() dto: FilterMovieDto) {
    return await this.movieService.getMoviesFilter(dto);
  }

  @Get('/search')
  async searchMoviesName(@Query() dto: SearchMovieDto) {
    return await this.movieService.searchNameMovie(dto);
  }
  @Get('/getFilters')
  async getAllGenres() {
    return await this.movieService.getAllFilters();
  }

  @Get('/groupMovies')
  async getGroupMovies(@Query() dto: GroupMovieDto) {
    return await this.movieService.getMoviesGroup(dto);
  }

  @Get('/favorites')
  async getFavoritesMovies(@Query() moviesID: {}) {
    return await this.movieService.getFavoritesMovies(Object.values(moviesID));
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return await this.movieService.deleteOneMovie(id);
  }
}
