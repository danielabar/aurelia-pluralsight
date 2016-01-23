import {inject} from 'aurelia-framework';
import {MovieService} from './movie/movie-service.js';

@inject(MovieService)
export class App {

  constructor(movieService) {
    this.constructorMessage = 'Hello from Aurelia constructor!';
    this.numChanges = 0;
    this.movieService = movieService;
  }

  activate() {
    this.activationMessage = 'Hello from Aurelia activate!';
    return this.movieService.fetchAll()
      .then(movies => this.movies = movies);
  }

  changeMessage() {
    this.numChanges += 1;
    this.dynamicMessage = `You clicked the button ${this.numChanges} times`;
  }

}
