var React = require('react');

var Card = require('../card/card');

var Todo = React.createClass({
    propTypes: {
        todo: React.PropTypes.shape({
            id: React.PropTypes.string,
            text: React.PropTypes.string,
            status: React.PropTypes.string
        }).isRequired
    },

    render: function () {
        return (
            <Card>
                <p>[{this.props.todo.status}] - {this.props.todo.id}</p>
                <p>{this.props.todo.text}</p>
            </Card>
        );
    }
});

module.exports = Todo;
