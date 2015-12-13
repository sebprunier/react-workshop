var React = require('react');

var cardStyle = {
    border: "1px grey solid",
    padding: 5,
    marginTop: 8,
    marginBottom: 8
};

var Card = React.createClass({
    render: function () {
        return (
            <div style={cardStyle}>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Card;