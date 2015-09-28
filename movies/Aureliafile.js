var cli = require('aurelia-cli');

var config = {
  js: {
    'src/appbundle': {
      modules: [
        '*',
        'aurelia-bootstrapper',
        'aurelia-framework',
        'aurelia-router',
        'aurelia-http-client',
        'aurelia-validation',
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  },
  template: {
    'src/appbundle': {
      pattern: 'src/**/*.html',
      options: { inject : true }
    }
  }
};

cli.command('bundle', config);
cli.command('unbundle', config);
