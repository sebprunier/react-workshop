var React = require('react');

var Todo = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="todo">
                {this.props.text}
            </div>
        );
    }
});

module.exports = Todo;
