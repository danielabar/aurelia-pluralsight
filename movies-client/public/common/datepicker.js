import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'jquery';
import 'jquery-ui';

@customElement('datepicker')
@inject(Element)
export class Datepicker {
  @bindable data;

  constructor(element) {
    this.element = element;
  }

  dataChanged(newVal) {
    this.data = newVal;
  }

  attached() {
    $(this.element).find('.wrapped-datepicker').datepicker({
      onSelect: dateText => {
        console.log(`User selected: ${dateText}`);
        this.data = dateText;
      }
    });
    // prepopulate
    if (this.data) {
      $(this.element).find('.wrapped-datepicker').datepicker('setDate', this.data);
    }
  }
}
