import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

let baseUrl = '/api/movies';

@inject(HttpClient)
export class MovieData {

  constructor(httpClient) {
    this.http = httpClient;
  }

  getAll() {
    return this.http.get(baseUrl + '.json')
      .then(response => {
        return response.content;
      });
  }

}
