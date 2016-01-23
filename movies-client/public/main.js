export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  // default root is document object
  // can also specify what module to load: a.setRoot('app')
  aurelia.start().then(a => a.setRoot());
}
