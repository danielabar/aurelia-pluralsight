# Building Applications with Aurelia

> My course notes from [Pluralsight course on Aurelia](https://app.pluralsight.com/library/courses/building-applications-aurelia/table-of-contents)

## Getting started with JSPM

JSPM is a package manager. It can be used to install packages and also configure itself (via entries in `config.js`) such that at runtime, the module loader will be able to locate these packages and make http requests to fetch js files.

To use it, start at root of project:

```shell
jspm init
```
* yes to create `package.json`, both npm and jspm use package.json to keep track of dependencies
* yes to prefix jspm properties in package.json
* enter path where static assets are served from, eg `public`
* accept default of `jspm_packages` folder under `public`, this is where jspm will install libraries
* yes to create `public/config.js`
* client base url can be `/`, i.e. what client would enter to get to the website
* yes to transpiler, babel

jspm is not just a package manager, but also serves up scripts that function as a run-time environment for application. These scripts can dynamically transpile js on the fly and dynamically load modules.

To kick it off, need to load two scripts in index.html:

* system.js itself, which was installed as part of jspm init
* config.js, which was generated as part of jspm init

### config.js

config.js contains the configuration information for the project, so that system.js can load the application and the libraries it requires. For the most part, jspm creates and maintains this file.

Generally don't need to manually edit this setting, except for some optional transpiler settings.

Provides the mapping between package names and locations on the file server.

### System.js

config.js is the configuration for _System.js_, which is a universal dynamic module loader. It understands how to load ES2015 modules, AMD, and CommonJS. Provides an API that is intended to be the future spec for loading modules natively in the browser.

Provides a standard global object `System`, which provides an api to import and load JavaScript modules.

The module loader is also capable of transpiling es2015 files on the fly to javascript, using the configured transpiler specified in config.js.

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

## Getting started with Aurelia

Aurelia is designed as multiple smaller modules rather than a single monolith.
For example, aurelia-framework contains the core framework, for data binding and templating,
aurelia-bootstrapper is for kickstarting an aurelia application.

First use jspm to install the framework:

```shell
jspm install aurelia-framework
jspm install aurelia-bootstrapper
```

To kick off the app from index.html:

```html
<body>

  <script src="jspm_packages/system.js"></script>
  <script src="config.js"></script>
  <script>
    System.import('aurelia-bootstrapper');
  </script>
</body>
```

Like many frameworks, Aurelia is going to take control, manage browser, history, routing, etc.
and will call into your application code, bootstrapper loads the application.

### MVVM and Conventions

By _convention_, the first thing the bootstrapper will do (if not given any other information), is to load the first _viewModel_ for the application, named "app".

Aurelia uses the Model-View-ViewModel design pattern to provide separation of concerns.

It will look for a viewModel for the application, and a corresponding view, and tie them together and load.

A viewModel is implemented as a class, simple example:

```javascript
export class App {

  constructor() {
    this.message = 'Hello from Aurelia!';
  }

  changeMessge() {
    this.message = 'foo';
  }

}
```

Also by convention, Aurelia will look for a view `app.html`, i.e. the same name as `app.js` but with html extension, and in the same directory as the viewModel.

Views are html _templates_, simple example with a binding expression from the view:

```html
<template>
  <div>${message}</div>
  <button click.trigger="changeMessage()">Click Me</button>
</template>
```

`click.trigger` is a binding expression that tells Aurelia when the user clicked the button, and will invoke the `changeMessage` method on the viewModel.

Finally, need to tell Aurelia where to load views in the DOM. This is specified with "aurelia-app" attribute in the index.html, for example:

```html
<body aurelia-app>
</body>
```

### Summary of bootstrapping process

* module loader loads aurelia-bootstrapper as specified by `System.import` in index.html
* aurelia-bootstrapper will look for `app.js` module
* aurelia-framework will construct an instance of the `app.js` viewModel, load the corresponding `app.html` view, tie the two together, and handle all the binding expressions in the view.
* if viewModel has an `activate()` method, Aurelia will call it before the view is rendered.

Note that application is written as just plain javascript and html, with a few special attributes and data binding expressions.

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
