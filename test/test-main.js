var tests = [];
for (var file in window.__karma__.files) {
    if (/spec|test\.js$/i.test(file)) {
        tests.push(file);
    }
}

var pathToModule = function (path) {
  console.log(path.replace(/^\/base\//, '').replace(/\.js$/, ''));
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

requirejs.config({
  baseUrl: '/base',

  paths: {
        
  },

  deps: tests,
  callback: window.__karma__.start
});