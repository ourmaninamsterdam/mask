module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],
    files: [
      'node_modules/sinon/pkg/sinon.js',
      {pattern: 'node_modules/**/*.js', included: false },
      'test/test-main.js',
      'js/**/*.js',
      'test/*.spec.js',
      'test/fixtures/*.html'
    ],
    exclude: [],
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