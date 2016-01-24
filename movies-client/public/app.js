export class App {

  configureRouter(config, router) {

    // expose router object to view
    this.router = router;

    config.map([
      { route: ['', 'list'], moduleId: 'movie/list', title: 'List', nav: true},
      { route: 'about', moduleId: 'about/about', title: 'About', nav: true}
    ]);
  }

}
