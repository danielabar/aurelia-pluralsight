import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {getLogger} from 'aurelia-logging';

@inject(HttpClient)
export class MovieService {

  constructor(httpClient) {
    this.logger = getLogger('MovieService');
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

  fetchOne(id) {
    return this.http.fetch(`movies/${id}`)
      .then(response => response.json())
      .catch(err => {
        err.json().then(errObj => this.logger.error(errObj.error.message));
      });
  }

}
