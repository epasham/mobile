module.exports = {
    dev: {
        nonull: true,
        files: [
            // Include our bower JS dependencies

            // angular
            {src: "bower_components/angular/angular.js", dest: "www/vendor/angular/angular.js"},
            {src: "bower_components/angular-animate/angular-animate.js", dest: "www/vendor/angular/angular-animate/angular-animate.js"},
            {src: "bower_components/angular-cookies/angular-cookies.js", dest: "www/vendor/angular/angular-cookies/angular-cookies.js"},            
            {src: "bower_components/angular-resource/angular-resource.js", dest: "www/vendor/angular/angular-resource/angular-resource.js"},
            {src: "bower_components/angular-sanitize/angular-sanitize.js", dest: "www/vendor/angular/angular-sanitize/angular-sanitize.js"},
            {src: "bower_components/angular-touch/angular-touch.js", dest: "www/vendor/angular/angular-touch/angular-touch.js"},
          
            // bootstrap
            {src: "bower_components/bootstrap/dist/css/bootstrap.css", dest: "www/css/bootstrap.css"},
            {src: "bower_components/bootstrap/dist/js/bootstrap.js", dest: "www/vendor/jquery/bootstrap.js"},
            {src: "**", dest: "www/fonts", cwd: 'bower_components/bootstrap/fonts', expand : true},

            // fontawesome
            {src: "bower_components/font-awesome/css/font-awesome.min.css", dest: "www/css/font-awesome.min.css"},
            {src: "**", dest: "www/fonts", cwd: 'bower_components/font-awesome/fonts', expand : true},

            // libs
            {src: "bower_components/moment/min/moment.min.js", dest: "www/vendor/libs/moment.min.js"},
            {src: "bower_components/screenfull/dist/screenfull.min.js", dest: "www/vendor/libs/screenfull.min.js"},

            // core
            {src: "bower_components/angular-ui-router/release/angular-ui-router.js", dest: "www/vendor/angular/angular-ui-router/angular-ui-router.js"},
            {src: "bower_components/angular-bootstrap/ui-bootstrap-tpls.js", dest: "www/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js"},
            {src: "bower_components/angular-translate/angular-translate.js", dest: "www/vendor/angular/angular-translate/angular-translate.js"},
            {src: "bower_components/angular-ui-utils/ui-utils.js", dest: "www/vendor/angular/angular-ui-utils/ui-utils.js"},
            {src: "bower_components/ngstorage/ngStorage.js", dest: "www/vendor/angular/ngstorage/ngStorage.js"},
            {src: "bower_components/oclazyload/dist/ocLazyLoad.js", dest: "www/vendor/angular/oclazyload/ocLazyLoad.js"},

            // modules for lazy load
            {src: "bower_components/angular-ui-select/dist/select.min.js", dest: "www/vendor/modules/angular-ui-select/select.min.js"},
            {src: "bower_components/angular-ui-select/dist/select.min.css", dest: "www/vendor/modules/angular-ui-select/select.min.css"},

            {src: "bower_components/textAngular/dist/textAngular.min.js", dest: "www/vendor/modules/textAngular/textAngular.min.js"},
            {src: "bower_components/textAngular/dist/textAngular-sanitize.min.js", dest: "www/vendor/modules/textAngular/textAngular-sanitize.min.js"},

            {src: "bower_components/venturocket-angular-slider/build/angular-slider.min.js", dest: "www/vendor/modules/angular-slider/angular-slider.min.js"},
            
            {src: "bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js", dest: "www/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js"},
            {src: "bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css", dest: "www/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css"},

            {src: "bower_components/angular-file-upload/angular-file-upload.min.js", dest: "www/vendor/modules/angular-file-upload/angular-file-upload.min.js"},

            {src: "bower_components/ngImgCrop/compile/minified/ng-img-crop.js", dest: "www/vendor/modules/ngImgCrop/ng-img-crop.js"},
            {src: "bower_components/ngImgCrop/compile/minified/ng-img-crop.css", dest: "www/vendor/modules/ngImgCrop/ng-img-crop.css"},

            {src: "bower_components/angular-ui-map/ui-map.js", dest: "www/vendor/modules/angular-ui-map/ui-map.js"},

            {src: "bower_components/angularjs-toaster/toaster.js", dest: "www/vendor/modules/angularjs-toaster/toaster.js"},
            {src: "bower_components/angularjs-toaster/toaster.css", dest: "www/vendor/modules/angularjs-toaster/toaster.css"},

            {src: "bower_components/ng-grid/build/ng-grid.min.js", dest: "www/vendor/modules/ng-grid/ng-grid.min.js"},
            {src: "bower_components/ng-grid/ng-grid.min.css", dest: "www/vendor/modules/ng-grid/ng-grid.min.css"},

        ]
    },
    dist: {
        files: [
            {expand: true, dest: 'dist/', src:'**', cwd:'www/'},
            {dest: 'dist/index.html', src:'www/index.min.html'}
        ]
    }
};