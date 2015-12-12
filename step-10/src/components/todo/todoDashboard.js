var React = require('react');
var uuid = require('uuid');

var TodoList = require('./todoList');
var TodoForm = require('./todoForm');
var TodoFilters = require('./todoFilters');

var fakeTodos = [
    {id: uuid.v4(), text: "Ceci est un todo", status: "NEW"},
    {id: uuid.v4(), text: "Ceci est un autre todo", status: "IN_PROGRESS"},
    {id: uuid.v4(), text: "Un todo terminé", status: "DONE"}
];

var TodoDashboard = React.createClass({

    getInitialState: function () {
        return {
            todos: fakeTodos,
            doneFilter: false
        }
    },

    toggleDone: function() {
        this.setState({
            doneFilter: !this.state.doneFilter
        })
    },

    createTodo: function (todo) {
        this.setState({
            todos: [].concat(todo, this.state.todos)
        })
    },

    updateTodo: function (todo) {
        var todos = [].concat(this.state.todos);
        var todoToUpdate = todos.filter(t => t.id === todo.id)[0];
        Object.assign(todoToUpdate, todo);
        this.setState({
            todos: todos
        })
    },

    filterTodos: function() {
        return this.state.todos.filter(todo => todo.status !== "DONE" || (this.state.doneFilter && todo.status === "DONE"))
    },

    render: function () {
        return (
            <div>
                <TodoFilters done={this.state.doneFilter} toggleDone={this.toggleDone} />
                <TodoForm createTodo={this.createTodo}/>
                <TodoList updateTodo={this.updateTodo} todos={this.filterTodos()}/>
            </div>
        )
    }
});

module.exports = TodoDashboard;
