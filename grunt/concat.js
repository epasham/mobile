module.exports = {
  dist:{
    src:[
      'www/vendor/jquery/jquery.min.js',
      'www/vendor/angular/angular.js',
      'www/vendor/angular/**/*.js',
      'www/js/*.js',
      'www/js/directives/*.js',
      'www/js/services/*.js',
      'www/js/filters/*.js',
      'www/js/controllers/bootstrap.js'
    ],
    dest:'dist/js/dist.js'
  }
}