import {inject} from 'aurelia-framework';
import {MovieService} from './movie-service.js';

@inject(MovieService)
export class Detail {

  constructor(movieService) {
    this.movieService = movieService;
  }

  activate(params) {
    return this.movieService.fetchOne(params.id)
      .then(movie => {
        this.movie = movie;
        // experiment for datepicker - does it pre-populate?
        console.log(`=== detail activate populating movie dateExperiment`);
        this.movie.dateExperiment = '01/07/2016';
      });
  }

  log() {
    console.log(this.movie.dateExperiment);
  }

}
