import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css!';

@customElement('datepicker')
@inject(Element)
export class DatePicker {
  @bindable data;

  constructor(element) {
    this.element = element;
  }

  dataChanged(newVal) {
    this.data = newVal;
  }

  attached() {
    $('.datepicker').datepicker();
  }
}
