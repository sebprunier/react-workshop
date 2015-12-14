var React = require('react');
var DoughnutChart = require("react-chartjs").Doughnut;

var colors = {
    NEW: {color: "#F7464A", highlight: "#FF5A5E"},
    IN_PROGRESS: {color: "#FDB45C", highlight: "#FFC870"},
    DONE: {color: "#46BFBD", highlight: "#5AD3D1"}
};

var TodoStatsWidget = React.createClass({

    render: function() {
        var counters = {};
        this.props.todos.forEach(function(todo) {
            counters[todo.status] = (counters[todo.status] || 0) + 1;
        });

        var chartData = Object.keys(counters).map(function(status) {
            return {
                label: status,
                value: counters[status],
                color: colors[status].color,
                highlight: colors[status].highlight
            };
        });

        var chartOptions = {};

        var renderLegend = function() {
            return chartData.map(data => { return (
                <p key={data.label}>
                    <span style={{color:'white', backgroundColor: data.color, padding: 2}}>{data.label + ' : ' + data.value}</span>
                </p>
            )});
        };

        return (
            <div>
                <DoughnutChart data={chartData} options={chartOptions} width="250" height="250" redraw />
                {renderLegend()}
            </div>
        );
    }

});

module.exports = TodoStatsWidget;
