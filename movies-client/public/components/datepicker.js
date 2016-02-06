import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css!';
import moment from 'moment';
import {getLogger} from 'aurelia-logging';

@customElement('datepicker')
@inject(Element)
export class DatePicker {
  @bindable data;

  constructor(element) {
    this.logger = getLogger('datepicker');
    this.logger.debug(`constructor: this.data = ${this.data}`);
    this.element = element;
  }

  // Called after all properties have their initial bound values set.
  bind() {
    this.logger.debug(`bind: this.data = ${this.data}`); // populated!

    // Find input element
    this.selector = $(this.element).find('.date');

    // Initialize datepicker
    this.selector.datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true
    });

    // Update bound data on selection
    this.selector.datepicker().on('changeDate', (e) => {
      this.data = moment(e.date).format('YYYY-MM-DD');
    });

    // Prepopulate with bound data if available
    if (this.data) {
      this.selector.datepicker('setDate', moment(this.data, 'YYYY-MM-DD').toDate());
    }
  }

  dataChanged(newVal, oldVal) {
    // this.data is already bound to newVal!
    this.logger.debug(`dataChanged: newVal = ${newVal}, oldVal = ${oldVal}, this.data = ${this.data}`);
    if (newVal) {
      this.selector.datepicker('setDate', moment(this.data, 'YYYY-MM-DD').toDate());
    }
  }

}
