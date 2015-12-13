var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Todo = require('./todo');

var TodoList = React.createClass({
    propTypes: {
        todos: React.PropTypes.array.isRequired
    },

    render: function () {
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="todoList" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.props.todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});

module.exports = TodoList;
