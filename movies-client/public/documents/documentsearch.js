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

  /**
   * This doesn't really search, just transitions into this view
   * with generated url that will cause activate to invoke the actual search.
   * Maybe a better name for this method is "searchRequested"
   */
  search() {
    if (this.query) {
      let url = this.router.generate('documents', { q: this.query });
      console.log(`=== DocumentSearch search generated url: ${url}`);
      this.router.navigate(url);
    }
  }

  /**
   * In a real app this would delegate to a service/http to fetch
   * the search results and return a promise.
   */
  doActualSearch(query) {
    return [
      {id: 1, name: `fake-name-1-${query}`},
      {id: 2, name: `fake-name-2-${query}`},
      {id: 3, name: `fake-name-3-${query}`}
    ];
  }

  activate(params) {
    console.log(`=== DocumentSearch activate with params: ${JSON.stringify(params)}`)
    if (params.q) {
      this.query = params.q;
      // In a real app this would return a promise of the search results
      this.searchResults = this.doActualSearch(this.query);
    }
  }

}
