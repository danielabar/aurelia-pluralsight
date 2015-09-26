import {inject} from 'aurelia-framework';
import {MovieData} from './movieData';

@inject(MovieData)
export class Details {

  constructor(movieData) {
    this.data = movieData;
  }

  // url attributes defined in router are available in params argument
  activate(params) {
    return this.data.getById(params.id)
      .then(movie => this.movie = movie);
  }

}
