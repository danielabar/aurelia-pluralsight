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
