import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class App {

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
