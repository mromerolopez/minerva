// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',

      // bower:js
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/datatables/media/js/jquery.dataTables.js',
      'client/bower_components/angular-datatables/dist/angular-datatables.js',
      'client/bower_components/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.js',
      'client/bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js',
      'client/bower_components/angular-datatables/dist/plugins/light-columnfilter/angular-datatables.light-columnfilter.js',
      'client/bower_components/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.js',
      'client/bower_components/angular-datatables/dist/plugins/fixedcolumns/angular-datatables.fixedcolumns.js',
      'client/bower_components/angular-datatables/dist/plugins/fixedheader/angular-datatables.fixedheader.js',
      'client/bower_components/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
      'client/bower_components/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.js',
      'client/bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
      'client/bower_components/angular-datatables/dist/plugins/select/angular-datatables.select.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/Chart.js/Chart.js',
      'client/bower_components/angular-chart.js/dist/angular-chart.js',
      'client/bower_components/sweetalert/dist/sweetalert.min.js',
      'client/bower_components/ngSweetAlert/SweetAlert.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-material/angular-material.js',
      'client/bower_components/PACE/pace.js',
      'client/bower_components/qrcode/lib/qrcode.js',
      'client/bower_components/angular-qr/src/angular-qr.js',
      'client/bower_components/angular-bootstrap-checkbox/angular-bootstrap-checkbox.js',
      'client/bower_components/angular-ui-notification/dist/angular-ui-notification.js',
      'client/bower_components/ng-csv/build/ng-csv.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'client/app/app.js',
      'client/{app,components}/**/*.module.js',
      'client/{app,components}/**/*.js',
      'client/{app,components}/**/*.html'
    ],

    preprocessors: {
      '**/*.html': 'ng-html2js',
      'client/{app,components}/**/*.js': 'babel'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline',
        optional: [
          'es7.classProperties'
        ]
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // reporter types:
    // - dots
    // - progress (default)
    // - spec (karma-spec-reporter)
    // - junit
    // - growl
    // - coverage
    reporters: ['spec'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};