var React = require('react');
var uuid = require('uuid');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Card = require('./card');
var Checkbox = require('./checkbox')

// TODO split code

var fakeTodos = [
    {id: uuid.v4(), text: "Ceci est un todo", status: "NEW"},
    {id: uuid.v4(), text: "Ceci est un autre todo", status: "IN_PROGRESS"},
    {id: uuid.v4(), text: "Un todo terminé", status: "DONE"}
];

var TodoBox = React.createClass({

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
                <Todos updateTodo={this.updateTodo} todos={this.filterTodos()}/>
            </div>
        )
    }
});

var TodoFilters = React.createClass({
    render: function () {
        return (
            <div>
                <Checkbox checked={this.props.done} onChange={this.props.toggleDone}/> Done
            </div>
        )
    }
});

var TodoForm = React.createClass({

    getInitialState: function () {
        return {
            text: ""
        }
    },

    handleTextChange: function (e) {
        this.setState({
            text: e.target.value
        })
    },

    createTodo: function () {
        this.props.createTodo({
            id: uuid.v4(),
            text: this.state.text,
            status: "NEW"
        });
        this.setState(this.getInitialState());
    },

    render: function () {
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <button onClick={this.createTodo}>Ajouter</button>
            </div>
        )
    }
});

var Todos = React.createClass({
    propTypes: {
        todos: React.PropTypes.array.isRequired
    },

    render: function () {
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="todoList" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.props.todos.map(todo => <Todo updateTodo={this.props.updateTodo} key={todo.id} todo={todo}/>)}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});


var statusLabels = {
    NEW: "Nouveau",
    IN_PROGRESS: "En cours",
    DONE: "Terminé"
};

var statusActions = {
    NEW: "Commencer",
    IN_PROGRESS: "Terminer"
};

var statuses = ["NEW", "IN_PROGRESS", "DONE"];

var Todo = React.createClass({
    propTypes: {
        todo: React.PropTypes.shape({
            id: React.PropTypes.string,
            text: React.PropTypes.string,
            status: React.PropTypes.oneOf(statuses)
        }).isRequired
    },

    nextStatus: function () {
        var todo = this.props.todo;
        this.props.updateTodo(Object.assign({}, todo, {status: statuses[statuses.indexOf(todo.status) + 1]}))
    },

    renderAction: function () {
        if (this.props.todo.status !== "DONE") {
            return <button onClick={this.nextStatus}>{statusActions[this.props.todo.status]}</button>
        }
    },

    render: function () {
        return (
            <Card>
                <p>{this.props.todo.text}</p>
                <p>{statusLabels[this.props.todo.status]}</p>
                {this.renderAction()}
            </Card>
        );
    }
});

module.exports = TodoBox;
