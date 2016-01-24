import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';

@inject(MovieService)
export class Detail {

  constructor(movieService) {
    this.movieService = movieService;
  }

  activate(params) {
    this.movieService.fetchOne(params.id)
      .then(movie => this.movie = movie);
  }

}
