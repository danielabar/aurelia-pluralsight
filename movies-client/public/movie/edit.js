import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';
import {getLogger} from 'aurelia-logging';
import * as toastr from 'toastr';

@inject(MovieService, toastr)
export class Edit {

  constructor(movieService, toastr) {
    this.logger = getLogger('edit');
    this.movieService = movieService;
    this.toastr = toastr;
  }

  activate(params) {
    return this.movieService.fetchOne(params.id)
      .then(movie => this.movie = movie);
  }

  save() {
    return this.movieService.save(this.movie)
      .then(movie => {
        this.movie = movie
        this.toastr.success('Movie saved');
      });
  }

  test() {
    this.movie.releaseYear = '2018-01-01';
    this.logger.debug(`test: movie.releaseYear = ${this.movie.releaseYear}`);
  }

}
