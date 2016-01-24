import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class MovieService {

  constructor(httpClient) {
    this.http = httpClient;
    // attempted to use http interceptor but not working as expected
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:3000/')
        .withInterceptor({
          responseError: function(err) {
            console.dir(err);
          }
        });
    });
  }

  fetchAll() {
    return this.http.fetch('movies')
      .then(response => response.json() );
  }

  fetchOne(id) {
    return this.http.fetch(`movies/${id}`)
      .then(response => response.json());
  }

}
