module.exports = waCrudProvider;

waCrudProvider.$inject = ['$stateProvider'];
function waCrudProvider($stateProvider) {
  return {
    states: (config) => {
      var name = config.name + '.' + config.endpoint;
      $stateProvider.state(name, Object.assign({}, {
          url: '/' + config.endpoint
          , views: {
            [config.view]: {
              template: '<wa-crud-list model="' + config.model + '">' + config.templates.list + '</wa-crud-list>'
            }
          }
        }, config.state))
        .state(name + '.create', Object.assign({}, {
          url: '/create'
          , views: {
            [config.view]: {
              template: '<wa-crud-single action="create" model="' + config.model + '">' + config.templates.create + '</wa-crud-single>'
            }
          }
        }, config.state))
        .state(name + '.edit', Object.assign({}, {
          url: '/edit/:id'
          , views: {
            [config.view]: {
              template: '<wa-crud-single action="edit" model="' + config.model + '">' + config.templates.edit + '</wa-crud-single>'
            }
          }
        }, config.state))
        .state(name + '.view', Object.assign({}, {
          url: '/:id'
          , views: {
            [config.view]: {
              template: '<wa-crud-single action="view" model="' + config.model + '">' + config.templates.view + '</wa-crud-single>'
            }
          }
        }, config.state))
    }
    , $get: () => {

    }
  }
}
