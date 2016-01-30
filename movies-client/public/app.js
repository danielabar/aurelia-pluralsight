export class App {

  configureRouter(config, router) {

    // expose router object to view
    this.router = router;

    config.map([
      { route: ['', 'list'], moduleId: 'movie/list', name: 'home', title: 'List', nav: true},
      { route: 'detail/:id', moduleId: 'movie/detail', name: 'detail', title: 'Movie Detail'},
      { route: 'edit/:id', moduleId: 'movie/edit', name: 'edit', title: 'Movie Edit'},
      { route: 'about', moduleId: 'about/about', title: 'About', nav: true}
    ]);
  }

}
