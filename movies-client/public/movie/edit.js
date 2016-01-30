import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';

@inject(MovieService)
export class Edit {

  constructor(movieService) {
    this.movieService = movieService;
  }

  activate(params) {
    return this.movieService.fetchOne(params.id)
      .then(movie => this.movie = movie);
  }

}
