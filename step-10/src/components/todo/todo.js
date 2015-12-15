/* eslint react/no-danger:0 */

var React = require('react');
var marked = require('marked');

var Card = require('../card/card');
var {Statuses, StatusesLabels, StatusesActions} = require('../status/status');

var Todo = React.createClass({
    propTypes: {
        todo: React.PropTypes.shape({
            id: React.PropTypes.string,
            title: React.PropTypes.string.isRequired,
            description: React.PropTypes.string,
            status: React.PropTypes.oneOf(Statuses)
        }).isRequired,
        updateTodo: React.PropTypes.func
    },

    handleNextStatus: function () {
        var todo = this.props.todo;
        this.props.updateTodo(Object.assign({}, todo, {status: Statuses[Statuses.indexOf(todo.status) + 1]}))
    },

    renderAction: function () {
        if (this.props.todo.status !== "DONE") {
            return (
                <button
                    type="button"
                    className="pure-button pure-button-primary action-button"
                    onClick={this.handleNextStatus}>
                    {StatusesActions[this.props.todo.status]}
                </button>
            );
        }
    },

    descriptionMarkup: function() {
        var markup = marked(this.props.todo.description, {sanitize: true});
        return {__html : markup};
    },

    render: function () {
        return (
            <Card>
                {this.renderAction()}
                <h3>{`[${StatusesLabels[this.props.todo.status]}] ${this.props.todo.title}`}</h3>
                <p dangerouslySetInnerHTML={this.descriptionMarkup()} />
            </Card>
        );
    }
});

module.exports = Todo;
