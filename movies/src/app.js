import {HttpClient} from 'aurelia-http-client';

export class App {

  constructor() {
    this.message = '';
    this.http = new HttpClient(); // later will inject
  }

  activate() {
    this.message = 'Hello from view model activate';
    return this.http.get('/api/movies.json')
      .then(response => {
        this.movies = response.content;
      });
  }

}
