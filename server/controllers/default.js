let Promise = require('bluebird');

module.exports = class DefaultRESTController {
    constructor(model) {
        this.model = model;
    }

    route(router) {
        return router
            .get('/', this.serve(this.findAll).bind(this))
            .get('/:id', this.serve(this.find).bind(this))
            //.get('/:id', this.serve(this.find).bind(this))
            ;
    }

    serve(fn) {
        return (req, res, next) => {
            Promise.method(fn.bind(this))(req, res, next)
                .bind(this)
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    next(err);
                })
        }
    }

    findAll() {
        return this.model.findAll();
    }

    find(req) {
        return this.model.find(req.query.id);
    }
};


//    get(
//}'/api/todos', function (req, res) {
//    // http://mongoosejs.com/docs/api.html#query_Query-find
//    Todo.find( function ( err, todos ){
//        res.json(200, todos);
//    });
//})
//
//    .post('/api/todos', function (req, res) {
//        var todo = new Todo( req.body );
//        todo.id = todo._id;
//        // http://mongoosejs.com/docs/api.html#model_Model-save
//        todo.save(function (err) {
//            res.json(200, todo);
//        });
//    })
//
//    .del('/api/todos', function (req, res) {
//        // http://mongoosejs.com/docs/api.html#query_Query-remove
//        Todo.remove({ completed: true }, function ( err ) {
//            res.json(200, {msg: 'OK'});
//        });
//    })
//
//    .get('/api/todos/:id', function (req, res) {
//        // http://mongoosejs.com/docs/api.html#model_Model.findById
//        Todo.findById( req.params.id, function ( err, todo ) {
//            res.json(200, todo);
//        });
//    })
//
//    .put('/api/todos/:id', function (req, res) {
//        // http://mongoosejs.com/docs/api.html#model_Model.findById
//        Todo.findById( req.params.id, function ( err, todo ) {
//            todo.title = req.body.title;
//            todo.completed = req.body.completed;
//            // http://mongoosejs.com/docs/api.html#model_Model-save
//            todo.save( function ( err, todo ){
//                res.json(200, todo);
//            });
//        });
//    })
//
//    .del('/api/todos/:id', function (req, res) {
//        // http://mongoosejs.com/docs/api.html#model_Model.findById
//        Todo.findById( req.params.id, function ( err, todo ) {
//            // http://mongoosejs.com/docs/api.html#model_Model.remove
//            todo.remove( function ( err, todo ){
//                res.json(200, {msg: 'OK'});
//            });
//        });
//    })
