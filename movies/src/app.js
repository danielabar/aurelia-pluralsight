import {HttpClient} from 'aurelia-http-client';

export class App {

  static inject() {
    return [HttpClient];
  }

  constructor(httpClient) {
    this.message = '';
    this.http = httpClient;
  }

  activate() {
    this.message = 'Hello from view model activate';
    return this.http.get('/api/movies.json')
      .then(response => {
        this.movies = response.content;
      });
  }

}
