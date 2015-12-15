var React = require('react');
var DoughnutChart = require("react-chartjs").Doughnut;

var {StatusesLabels, StatusesColors} = require('../status/status');

var TodoStatsWidget = React.createClass({
    propTypes: {
        todos: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        var counters = {};
        this.props.todos.forEach(function(todo) {
            counters[todo.status] = (counters[todo.status] || 0) + 1;
        });

        var chartData = Object.keys(counters).map(function(status) {
            return {
                label: StatusesLabels[status],
                value: counters[status],
                color: StatusesColors[status].color,
                highlight: StatusesColors[status].highlightColor
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
                <DoughnutChart
                    data={chartData}
                    options={chartOptions}
                    width="250"
                    height="250"
                    redraw
                />
                {renderLegend()}
            </div>
        );
    }

});

module.exports = TodoStatsWidget;
