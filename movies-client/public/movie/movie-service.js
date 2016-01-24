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

  fetchOne(id) {
    return this.http.fetch(`movies/${id}`)
      .then(response => response.json())
      .catch(err => {
        console.log('=== FETCH ONE CATCH ===');
        err.json().then(errObj => console.dir(errObj.error.message));
      });
  }

}
