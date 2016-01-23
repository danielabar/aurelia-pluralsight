import {HttpClient} from 'aurelia-fetch-client';

export class App {

  constructor() {
    this.constructorMessage = 'Hello from Aurelia constructor!';
    this.numChanges = 0;
    this.http = new HttpClient();
  }

  activate() {
    this.activationMessage = 'Hello from Aurelia activate!';
    return this.http.fetch('http://localhost:3000/movies')
      .then(response => response.json())
      .then(movies => this.movies = movies);
  }

  changeMessage() {
    this.numChanges += 1;
    this.dynamicMessage = `You clicked the button ${this.numChanges} times`;
  }

}