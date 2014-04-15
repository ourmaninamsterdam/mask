module.exports = function(config) {
  config.set({
    basePath: 'src',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'js/**/*.js',
      'tests/**/*.spec.js'
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
