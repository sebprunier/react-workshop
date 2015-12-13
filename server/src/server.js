var restify = require('restify');
var uuid = require('uuid');

var id1 = uuid.v4();
var id2 = uuid.v4();
var id3 = uuid.v4();

var todosById = {};
todosById[id1] = {id: id1, text: "Ceci est un todo", status: "NEW"};
todosById[id2] = {id: id2, text: "Ceci est un autre todo", status: "IN_PROGRESS"};
todosById[id3] = {id: id3, text: "Un todo terminé", status: "DONE"};

var server = restify.createServer({
    name: 'react-workshop-server',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/todos', function (req, res, next) {
    res.send(Object.keys(todosById).map(function(id) {
      return todosById[id];
    }));
    return next();
});

server.get('/todos/:id', function (req, res, next) {
    var todo = todosById[req.params.id];
    if (!todo) {
        return next(new restify.NotFoundError("Not Found"))
    }
    res.send(todo);
    return next();
});

server.post('/todos', function (req, res, next) {
    var newTodoId = uuid.v4();
    var newTodo = {
        id: newTodoId,
        text: req.body.text,
        status: 'NEW'
    };
    todosById[newTodoId] = newTodo;
    res.send(201, newTodo);
});


server.listen(9090, function () {
  console.log('%s listening at %s', server.name, server.url);
});
