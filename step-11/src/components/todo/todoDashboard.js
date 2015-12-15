var React = require('react');
var uuid = require('uuid');
var axios = require('axios');

var TodoList = require('./todoList');
var TodoForm = require('./todoForm');
var TodoFilters = require('./todoFilters');
var TodoStatsWidget = require('./todoStatsWidget');

var fakeTodos = [
    {id: uuid.v4(), title: "Ceci est un todo", description: "La description du todo, **avec du gras**", status: "NEW"},
    {id: uuid.v4(), title: "Ceci est un autre todo", description: "Tiens, encore un todo ... [avec un lien](http://www.google.fr)", status: "IN_PROGRESS"},
    {id: uuid.v4(), title: "Un todo terminé", description: "Ca, c'est fait !!", status: "DONE"}
];

var TodoDashboard = React.createClass({

    getInitialState: function () {
        return {
            todos: [],
            filters: {
                statuses: {
                    NEW: true,
                    IN_PROGRESS: true,
                    DONE: false
                }
            }
        }
    },

    loadTodosFromServer: function() {
        var filters = this.state.filters;
        var statuses = [];
        Object.keys(filters.statuses).forEach(key => {
            if (filters.statuses[key]) {
                statuses.push(key);
            }
        });
        var statusesQueryParams = "";
        if (statuses.length > 0) {
            statusesQueryParams += "?status=" + statuses.join('&status=')
        }

        axios.get(`http://localhost:9090/todos${statusesQueryParams}`)
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(response => {
                console.log(response);
                // TODO gérer un flag d'erreur dans le state
            });
    },

    componentDidMount: function() {
        this.loadTodosFromServer();
    },

    toggleStatus: function(status) {
        var filters = Object.assign({}, this.state.filters);
        filters.statuses[status] = !this.state.filters.statuses[status];
        var change = {filters: filters};
        // XXX bof ...
        this.setState(change, function() {
            this.loadTodosFromServer();
        });
    },

    createTodo: function (todo) {
        axios.post('http://localhost:9090/todos', todo)
            .then(response => {
                this.loadTodosFromServer();
            })
            .catch(response => {
                console.log(response);
                // TODO gérer un flag d'erreur dans le state
            });
    },

    updateTodoStatus: function (todoStatus) {
        axios.post(`http://localhost:9090/todos/${todoStatus.id}/status`, {status: todoStatus.status})
            .then(response => {
                this.loadTodosFromServer();
            })
            .catch(response => {
                console.log(response);
                // TODO gérer un flag d'erreur dans le state
            });
    },

    render: function () {
        return (
            <div className="pure-g">
                <div className="pure-u-1-4">
                    <div className="box">
                        <h2>Nouvelle tâche</h2>
                        <TodoForm createTodo={this.createTodo}/>
                    </div>
                    <div className="box">
                        <h2>Statistiques</h2>
                        <TodoStatsWidget todos={this.state.todos}/>
                    </div>
                </div>
                <div className="pure-u-3-4">
                    <div className="box">
                        <h2>Liste des tâches</h2>
                        <TodoFilters filters={this.state.filters} toggleStatus={this.toggleStatus} />
                    </div>
                    <div className="box">
                        <TodoList updateTodoStatus={this.updateTodoStatus} todos={this.state.todos}/>
                    </div>
                </div>

            </div>
        )
    }
});

module.exports = TodoDashboard;
