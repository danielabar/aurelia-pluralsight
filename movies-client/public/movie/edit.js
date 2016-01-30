import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';
import {getLogger} from 'aurelia-logging';

@inject(MovieService)
export class Edit {

  constructor(movieService) {
    this.logger = getLogger('movie/edit');
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
        this.logger.debug(`Movie update success`);
      });
  }

}
