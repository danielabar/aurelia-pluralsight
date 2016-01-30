import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {getLogger} from 'aurelia-logging';
// import {MovieServiceUpdate} from './movie-service-update';

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

  save(movie) {
    console.dir(movie);
    if (movie.id) {
      return this.http.fetch(`movies/${movie.id}`, {
        method: 'put',
        body: JSON.stringify(movie),
        headers: { "Accept": "application/json", "Content-Type": "application/json" }
      })
      .then( response => { return response.json() } )
      .catch(err => {
        err.json().then(errObj => this.logger.error(errObj.error.message));
      });
    } else {
      return this.http.fetch(`movies`, {
          method: 'post',
          body: JSON.stringify(movie),
          headers: { "Accept": "application/json", "Content-Type": "application/json" }
      })
      .then( response => { return response.json() } )
      .catch(err => {
        err.json().then(errObj => this.logger.error(errObj.error.message));
      });
    }
}

  // save(movie) {
  //   return this.movieServiceUpdate.save(movie);
  // }

}
