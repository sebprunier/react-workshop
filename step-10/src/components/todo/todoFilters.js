var React = require('react');

var checkboxStyle = {
    marginLeft: 16
};

var TodoFilters = React.createClass({
    propTypes: {
        filters: React.PropTypes.shape({
            statuses: React.PropTypes.shape({
                NEW: React.PropTypes.bool,
                IN_PROGRESS: React.PropTypes.bool,
                DONE: React.PropTypes.bool
            })
        }),
        toggleStatus: React.PropTypes.func
    },

    handleStatusFilterChange: function(status) {
        this.props.toggleStatus(status);
    },

    render: function () {
        return (
            <div>
                <span>{'Filtrer par statut : '}</span>

                <input
                    type="checkbox"
                    checked={this.props.filters.statuses.NEW}
                    onChange={this.handleStatusFilterChange.bind(this, 'NEW')}
                    style={checkboxStyle}
                /> {'Nouveau'}

                <input
                    type="checkbox"
                    checked={this.props.filters.statuses.IN_PROGRESS}
                    onChange={this.handleStatusFilterChange.bind(this, 'IN_PROGRESS')}
                    style={checkboxStyle}
                /> {'En cours'}

                <input
                    type="checkbox"
                    checked={this.props.filters.statuses.DONE}
                    onChange={this.handleStatusFilterChange.bind(this, 'DONE')}
                    style={checkboxStyle}
                /> {'Terminé'}
            </div>
        )
    }
});

module.exports = TodoFilters;
