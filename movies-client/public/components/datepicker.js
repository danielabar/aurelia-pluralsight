import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css!';
import moment from 'moment';

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
    // Find input element
    let selector = $(this.element).find('.date');

    // Initialize datepicker
    selector.datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true
    });

    // Update bound data on selection
    selector.datepicker().on('changeDate', (e) => {
      // could also say: this.data = e.format();
      this.data = moment(e.date).format('YYYY-MM-DD');
    });

    // Prepopulate with bound data
    if (this.data) {
      selector.datepicker('setDate', moment(this.data, 'YYYY-MM-DD').toDate());
    }
  }
}
