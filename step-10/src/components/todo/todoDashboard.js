var React = require('react');
var uuid = require('uuid');

var TodoList = require('./todoList');
var TodoForm = require('./todoForm');
var TodoFilters = require('./todoFilters');
var TodoStatsWidget = require('./todoStatsWidget');

var fakeTodos = [
    {id: uuid.v4(), text: "Ceci est un todo", status: "NEW"},
    {id: uuid.v4(), text: "Ceci est un autre todo", status: "IN_PROGRESS"},
    {id: uuid.v4(), text: "Un todo terminé", status: "DONE"}
];

var TodoDashboard = React.createClass({

    getInitialState: function () {
        return {
            todos: fakeTodos,
            filters: {
                statuses: {
                    NEW: true,
                    IN_PROGRESS: true,
                    DONE: false
                }
            }
        }
    },

    toggleStatus: function(status) {
        var filters = Object.assign({}, this.state.filters);
        filters.statuses[status] = !this.state.filters.statuses[status];
        var change = {filters: filters};
        this.setState(change);
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
        return this.state.todos.filter(todo => this.state.filters.statuses[todo.status]);
    },

    render: function () {
        return (
            <div>
                <TodoFilters filters={this.state.filters} toggleStatus={this.toggleStatus} />
                <TodoForm createTodo={this.createTodo}/>
                <TodoList updateTodo={this.updateTodo} todos={this.filterTodos()}/>
                <TodoStatsWidget todos={this.state.todos}/>
            </div>
        )
    }
});

module.exports = TodoDashboard;
