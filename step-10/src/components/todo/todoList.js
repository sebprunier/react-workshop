var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Todo = require('./todo');

var TodoList = React.createClass({
    propTypes: {
        todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        updateTodo: React.PropTypes.func
    },

    renderTodo: function(todo) {
        return (
            <Todo
                key={todo.id}
                todo={todo}
                updateTodo={this.props.updateTodo} />
    );
    },

    render: function () {
        var todos = this.props.todos;
        if (todos.length <= 0) {
            return (
                <div>{'Aucune tâche ne correspond aux critères de recherche'}</div>
            )
        }
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="todoList"
                    transitionAppear
                    ransitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {todos.map(this.renderTodo)}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});

module.exports = TodoList;
