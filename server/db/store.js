var JSData = require('js-data');
var DSMongoDBAdapter = require('js-data-mongodb');

var store = new JSData.DS();
var adapter = new DSMongoDBAdapter(process.env.DB_MONGO_URL);
store.registerAdapter('mongodb', adapter, {default: true});

module.exports = store;