export class App {

  configureRouter(config, router) {
    this.router = router;

    // entries with nav:true get exposed as a collection router.navigation that can be used in view
    config.map([
      { route: ['', 'list'], moduleId: 'movies/list', title: 'List', nav: true },
      { route: 'about', moduleId: 'about/about', title: 'About', nav: true }
    ]);
  }

}
