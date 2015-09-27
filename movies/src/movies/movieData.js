import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

let baseUrl = 'http://localhost:3000/movies';

@inject(HttpClient)
export class MovieData {

  constructor(httpClient) {
    this.http = httpClient;
  }

  getAll() {
    return this.http.get(baseUrl)
      .then(response => {
        return response.content;
      });
  }

  getById(id) {
    return this.http.get(`${baseUrl}/${id}`)
      .then(response => {
        return response.content;
      });
  }

  // TODO: if movie.id then its an update, otherwise, post to save a new movie
  save(movie) {
    return this.http.put(`${baseUrl}/${movie.id}`, movie)
      .then(response => {
        return response.content;
      });
  }

}
