var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require('fluxxor');
var uuid = require('uuid');

var TodoDashboard = require('./components/todo/todoDashboard');

var fakeTodos = [
    {id: uuid.v4(), text: "Ceci est un todo", status: "NEW"},
    {id: uuid.v4(), text: "Ceci est un autre todo", status: "IN_PROGRESS"},
    {id: uuid.v4(), text: "Un todo terminé", status: "DONE"}
];

var constants = {
  ADD_TODO: "ADD_TODO"
};

var TodoStore = Fluxxor.createStore({
  initialize: function() {
    this.todos = fakeTodos;

    this.bindActions(
      constants.ADD_TODO, this.onAddTodo
    );
  },

  onAddTodo: function(payload) {
    var todo = {
      id: uuid.v4(),
      text: payload.text,
      status: "NEW"
    };
    this.todos = [].concat(todo, this.todos)
    this.emit("change");
  },

  getState: function() {
    return {
      todos: this.todos
    };
  }

});

var actions = {
  addTodo: function(text) {
    this.dispatch(constants.ADD_TODO, {text: text});
  }
};

var stores = {
  TodoStore: new TodoStore()
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

ReactDOM.render(
    <TodoDashboard flux={flux} />,
    document.getElementById('main')
);
