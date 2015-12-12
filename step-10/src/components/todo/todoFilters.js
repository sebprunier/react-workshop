var React = require('react');

var TodoFilters = React.createClass({
    render: function () {
        return (
            <div>
                <input type="checkbox" checked={this.props.done} onChange={this.props.toggleDone}/> Done
            </div>
        )
    }
});

module.exports = TodoFilters;
