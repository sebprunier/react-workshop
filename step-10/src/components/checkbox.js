var React = require('react');

var Checkbox = React.createClass({
    render: function () {
        if (this.props.checked) {
            return <input type="checkbox" name={this.props.name} onChange={this.props.onChange} checked/>
        } else {
            return <input type="checkbox" name={this.props.name} onChange={this.props.onChange}/>
        }
    }
});

module.exports = Checkbox;