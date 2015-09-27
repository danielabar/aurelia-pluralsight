import {inject} from 'aurelia-framework';
import {MovieData} from './movieData';
import {Router} from 'aurelia-router';
import {Validation} from 'aurelia-validation';

@inject(MovieData, Router, Validation)
export class Edit {

  constructor(movieData, router, validation) {
    this.data = movieData;
    this.router = router;
    this.validation = validation.on(this)
      .ensure('movie.title')
        .isNotEmpty()
        .hasMinLength(3)
        .hasMaxLength(100)
      .ensure('movie.releaseYear')
        .isNumber()
        .isBetween(1900, 2100);
  }

  activate(params) {
    return this.data.getById(params.id)
      .then(movie => {
        this.movie = movie;
        this.validation.validate();
      });
  }

  save() {
    this.validationMessages = [];
    this.validation.validate()
      .then( () => {
        this.hasError = false;
        // form is valid, go ahead and save
        this.data.save(this.movie)
          .then(movie => {
            let url = this.router.generate('details', { id: movie.id });
            this.router.navigate(url);
          })
          .catch(err => {
            console.error(JSON.stringify(err, null, 2));
          });
      })
      .catch( result => {
        this.hasError = true;
        for (let prop in result.properties) {
          let thisProp = result.properties[prop];
          if (!thisProp.isValid) {
            this.validationMessages.push(thisProp.message);
          }
        }
      });

  }

}
