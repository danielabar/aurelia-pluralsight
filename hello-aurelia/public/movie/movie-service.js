import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class MovieService {

  constructor(httpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/');
    });

    this.http = httpClient;
  }

  fetchAll() {
    return this.http.fetch('movies')
      .then(response => response.json())
  }

}
