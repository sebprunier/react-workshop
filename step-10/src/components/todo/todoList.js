var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Todo = require('./todo');

var TodoList = React.createClass({
    propTypes: {
        todos: React.PropTypes.array.isRequired
    },

    render: function () {
        var todos = this.props.todos;
        if (todos.length <= 0) {
            return (
                <div>Aucune tâche ne correspond aux critères de recherche</div>
            )
        }
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="todoList" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {todos.map(todo => <Todo updateTodo={this.props.updateTodo} key={todo.id} todo={todo}/>)}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});

module.exports = TodoList;
