import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class MovieService {

  constructor(httpClient) {
    this.http = httpClient;
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/');
    });
  }

  fetchAll() {
    return this.http.fetch('movies')
      .then(response => response.json() );
  }

}
