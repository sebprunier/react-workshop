var React = require('react');

var TodoStatsWidget = React.createClass({

    render: function() {
        var counters = {};
        this.props.todos.forEach(function(todo) {
            counters[todo.status] = (counters[todo.status] || 0) + 1;
        });

        var stats = Object.keys(counters).map(function(status) {
            return {status: status, value: counters[status]};
        });

        return (
            <div>
                {stats.map(stat => <p key={stat.status}>{stat.status} : {stat.value}</p>)}
            </div>
        );
    }

});

module.exports = TodoStatsWidget;
