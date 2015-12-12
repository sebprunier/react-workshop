var React = require('react');

var Card = require('../card/card');

var Statuses = ["NEW", "IN_PROGRESS", "DONE"];

var StatusesLabels = {
    NEW: "Nouveau",
    IN_PROGRESS: "En cours",
    DONE: "Terminé"
};

var StatusesActions = {
    NEW: "Commencer",
    IN_PROGRESS: "Terminer"
};

var Todo = React.createClass({
    propTypes: {
        todo: React.PropTypes.shape({
            id: React.PropTypes.string,
            text: React.PropTypes.string,
            status: React.PropTypes.oneOf(Statuses)
        }).isRequired,
        updateTodo: React.PropTypes.func
    },

    nextStatus: function () {
        var todo = this.props.todo;
        this.props.updateTodo(Object.assign({}, todo, {status: Statuses[Statuses.indexOf(todo.status) + 1]}))
    },

    renderAction: function () {
        if (this.props.todo.status !== "DONE") {
            return <button onClick={this.nextStatus}>{StatusesActions[this.props.todo.status]}</button>
        }
    },

    render: function () {
        return (
            <Card>
                <p>{this.props.todo.text}</p>
                <p>{StatusesLabels[this.props.todo.status]}</p>
                {this.renderAction()}
            </Card>
        );
    }
});

module.exports = Todo;
