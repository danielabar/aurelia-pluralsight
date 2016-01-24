import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';

@inject(MovieService)
export class List {

  constructor(movieService) {
    this.movieService = movieService;
  }

  activate() {
    return this.movieService.fetchAll()
      .then(movies => this.movies = movies);
  }

}
