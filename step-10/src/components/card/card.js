var React = require('react');

var cardStyle = {
    border: "1px grey solid",
    padding: '0px 16px 16px 16px',
    marginBottom: 16,
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
};

var Card = React.createClass({
    propTypes: {
        children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
    },

    render: function () {
        return (
            <div style={cardStyle}>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Card;
