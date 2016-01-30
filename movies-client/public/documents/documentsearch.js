import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {activationStrategy} from 'aurelia-router';

@inject(Router)
export class DocumentSearch {

  constructor(router) {
    this.router = router;
  }

  determineActivationStrategy(){
    return activationStrategy.replace;
  }

  search() {
    if (this.query) {
      let url = this.router.generate('documents', { q: this.query });
      console.log(`=== DocumentSearch search generated url: ${url}`);
      // let navigationOptions = { trigger: true, replace: true };
      // this.router.navigate(url, navigationOptions);
      this.router.navigate(url);
    }
  }

  activate(params) {
    console.log(`=== DocumentSearch activate with params: ${JSON.stringify(params)}`)
    if (params) {
      this.query = params.q;
    }
  }

}
