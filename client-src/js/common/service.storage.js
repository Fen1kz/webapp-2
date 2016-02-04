module.exports = factory;

factory.$inject = ['$window'];
function factory($window) {
  var storage = $window.localStorage;

  var service = {
    get: (key) => {
      var item = storage.getItem(key);
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    , set: (key, value) => {
      storage.setItem(key, (typeof value !== 'object') ? value : JSON.stringify(value))
    }
    , remove: (key) => {
      storage.removeItem(key);
    }
    , clear: () => {
      storage.clear();
    }
  };

  return service;
}
