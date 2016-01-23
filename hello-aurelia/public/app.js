export class App {

  constructor() {
    this.constructorMessage = 'Hello from Aurelia constructor!';
    this.numChanges = 0;
  }

  activate() {
    this.activationMessage = 'Hello from Aurelia activate!';
  }

  changeMessage() {
    this.numChanges += 1;
    this.dynamicMessage = `You clicked the button ${this.numChanges} times`;
  }

}
