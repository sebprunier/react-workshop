var React = require('react');

var TodoFilters = React.createClass({
    handleStatusFilterChange: function(status) {
        this.props.toggleStatus(status);
    },

    render: function () {
        return (
            <div>
                <input type="checkbox" checked={this.props.filters.statuses.NEW} onChange={this.handleStatusFilterChange.bind(this, 'NEW')}/> Nouveau
                <input type="checkbox" checked={this.props.filters.statuses.IN_PROGRESS} onChange={this.handleStatusFilterChange.bind(this, 'IN_PROGRESS')}/> En cours
                <input type="checkbox" checked={this.props.filters.statuses.DONE} onChange={this.handleStatusFilterChange.bind(this, 'DONE')}/> Terminé
            </div>
        )
    }
});

module.exports = TodoFilters;
