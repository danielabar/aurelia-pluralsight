export class App {

  constructor() {
    this.message = '';
  }

  activate() {
    this.message = 'Hello from view model activate';
  }

  changeMessage() {
    if (this.message === 'Goodbye') {
      this.message = 'Hello';
    } else {
      this.message = 'Goodbye';
    }
  }
}
