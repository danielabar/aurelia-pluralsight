import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';
import {getLogger} from 'aurelia-logging';
import * as toastr from 'toastr';

@inject(MovieService)
export class Edit {

  constructor(movieService) {
    this.logger = getLogger('edit');
    this.movieService = movieService;
  }

  activate(params) {
    return this.movieService.fetchOne(params.id)
      .then(movie => this.movie = movie);
  }

  save() {
    return this.movieService.save(this.movie)
      .then(movie => {
        this.movie = movie
        toastr.success('Movie saved');
      });
  }

  test() {
    this.movie.releaseYear = '2018-01-01';
    this.logger.debug(`test: movie.releaseYear = ${this.movie.releaseYear}`);
  }

}
