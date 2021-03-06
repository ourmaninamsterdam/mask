module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['requirejs','mocha', 'chai', 'sinon'],
    files: [
      'test/fixtures/*.html',
      'test/test-main.js',
      {pattern: 'src/js/**/*.js', included: false},
      {pattern: 'test/tests/*.spec.js', included: false},
      {pattern: 'bower_components/**/*.js', included: false}
    ],
    exclude: [],
    preprocessors: {
      '**/*.html': ['html2js']
    },
    reporters: ['progress'],
    port: 9999,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 6000,
    singleRun: false
  });
};