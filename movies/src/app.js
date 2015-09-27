export class App {

  configureRouter(config, router) {
    this.router = router;

    // entries with nav:true get exposed as a collection router.navigation that can be used in view
    // note that multple routes can use the same module, for exaple edit with id param, and create with no param
    config.map([
      { route: ['', 'list'], moduleId: 'movies/list', title: 'List', nav: true, name: 'home' },
      { route: 'about', moduleId: 'about/about', title: 'About', nav: true },
      { route: 'details/:id', moduleId: 'movies/details', title: 'Details', name: 'details'},
      { route: 'edit/:id', moduleId: 'movies/edit', title: 'Edit', name: 'edit'},
      { route: 'create', moduleId: 'movies/edit', title: 'Create', name: 'create'}
    ]);
  }

}
