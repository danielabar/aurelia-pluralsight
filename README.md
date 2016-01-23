# Building Applications with Aurelia

> My course notes from [Pluralsight course on Aurelia](https://app.pluralsight.com/library/courses/building-applications-aurelia/table-of-contents)

## Getting started with JSPM

Start at root of project:

```shell
jspm init
```
* yes to create `package.json`, both npm and jspm use package.json to keep track of dependencies
* yes to prefix jspm properties in package.json
* enter path where static assets are served from, eg `public`
* accept default of `jspm_packages` folder under `public`
* yes to create `public/config.js`
* client base url can be `/`, i.e. what client would enter to get to the website
* yes to transpiler, babel

jspm is not just a package manager, but also serves up scripts that function as a run-time environment for application. These scripts can dynamically transpile js on the fly and dynamically load modules.

To kick it off, need to load two scripts in index.html:

* system.js itself, which was installed as part of jspm init
* config.js, which was generated as part of jspm init

### config.js

config.js contains the configuration information for the project, so that system.js can load the application and the libraries it requires. For the most part, jspm manages this file. Generally don't need to manually edit this setting, except for some optional transpiler settings.

### System.js

config.js is the configuration for _System.js_, which is a universal dynamic module loader. It understands how to load ES2015 modules, AMD, and CommonJS.

To tell System.js to load a module, for example to kick things off in index.html:

```html
<body>

  <script src="jspm_packages/system.js"></script>
  <script src="config.js"></script>
  <script>
    System.import('app');
  </script>
</body>
```

## Data Binding

`show.bind` hides and shows an element depending on truthiness of expression.

`if.bind` remove or add element from DOM depending on truthiness of expression.

`.bind` can be added to almost any element, for example to use inline styles

```html
<li style.bind="foo">some item</li>
```

String interpolation is done with `${bar}`

When using `.bind`, dollar sign and curly braces are not needed.

Bind syntax is a little cleaner, but string interpolation is useful when static content
needs to be mixed into the expression.

String interpolation is always one way, content moved from view-model into the view as a string.
Whereas `.bind` can be one or two way, Aurelia will pick a sensible default if you don't specify.

For example binding to a css class will be one way:

```html
<li repeat.for="row of router.navigation" class="${row.isActive ? 'active' : ''}">
  ...
</li>
```

But binding to an text input value will be two way by default, because Aurelia assumes
if user types into the input, that the value should be pushed back to the JavaScript object.

```html
<input type="text" value.bind="movie.title">
```

To wire up click handler, can use either `click.bind` or `click.delegate`.
Delegate is more flexible because it catches click events on the element AND any of its descendants.

```html
<button class="btn btn-primary" click.delegate="save()">
  Save
</button>
```

## HTTP Client Configuration

```javascript
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class SomeApi {

  let baseUrl = 'http://localhost:3000/movies';

  constructor(httpClient) {
    this.http = httpClient;
  }

  save(someObj) {
    var request = this.http.createRequest();
    request.asPut()
      .withUrl(baseUrl)
      .withHeader('Accept', 'application/json')
      .withHeader('Content-Type', 'application/json')
      .withContent(someObj)

    return request.send()
      .then(response => response.content);
  }
}
```

## Client side validation

Aurelia provides an optional module to perform client side validation. First install it:

```
jspm install aurelia-validation
```

Then configure it in `main.js`:

```
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation');

  aurelia.start().then(a => a.setRoot('app'));
}
```

## Custom Element

Add a view (html file with template tag) and viewModel.

Expose bindable properties with `@bindable` (requires enabling `es7.classProperties` in babel options in config.js).

```javascript
import {bindable} from 'aurelia-framework';

export class NavMenu {
  @bindable router = null;
}
```

Use the custom element in a view

```html
<template>
  <require from="./resources/nav-menu"></require>
  <nav-menu router.bind="router"></nav-menu>
  ... other view stuff here
</template>
```

Can also register a custom element in main.js so that it is globally available,
then don't have to use `<require>` to import it in each view that wishes to use it.

## Production Bundling

In development mode, each moduel is loaded via xhr, and ES6 -> ES5 is transpiled on the fly with Babel.

Use aurelia-cli and gulp to transpile, concat and minify all the javascript once at build time.

Install aurelia-cli globally and locally within project.

```
npm install aurelia-cli -g
npm install aurelia-cli --save-dev
```

An aurelia file is similar to a gulp or grunt file. It executes under node.js
and contains bundling instructions.

There are two kinds of bundles, `js` and `template`

Setting `inject: true` in js bundle options will inject the bundle into config.js.

So at runtime, the optimized bundle will be used, and no need to modify `index.html`.

```
aurelia bundle
aurelia unbundle
```

## Further optimizations

Install grunt-cli globally and grunt locally:

```
npm install gulp-cli -g
npm install gulp --save-dev
npm install gulp-uglify --save-dev
```
