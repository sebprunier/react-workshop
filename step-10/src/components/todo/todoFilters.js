var React = require('react');

var checkboxStyle = {
    marginLeft: 16
};

var TodoFilters = React.createClass({
    handleStatusFilterChange: function(status) {
        this.props.toggleStatus(status);
    },

    render: function () {
        return (
            <div>
                <span>Filtrer par statut : </span>
                
                <input type="checkbox"
                    checked={this.props.filters.statuses.NEW}
                    onChange={this.handleStatusFilterChange.bind(this, 'NEW')}
                    style={checkboxStyle}
                /> Nouveau

                <input type="checkbox"
                    checked={this.props.filters.statuses.IN_PROGRESS}
                    onChange={this.handleStatusFilterChange.bind(this, 'IN_PROGRESS')}
                    style={checkboxStyle}
                /> En cours

                <input type="checkbox"
                    checked={this.props.filters.statuses.DONE}
                    onChange={this.handleStatusFilterChange.bind(this, 'DONE')}
                    style={checkboxStyle}
                /> Terminé
            </div>
        )
    }
});

module.exports = TodoFilters;
