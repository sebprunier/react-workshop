var React = require('react');
var uuid = require('uuid');

var TodoList = require('./todoList');
var TodoForm = require('./todoForm');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TodoDashboard = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin("TodoStore")],

    getInitialState: function () {
        return {}
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();
        return flux.store("TodoStore").getState();
    },

    render: function () {
        return (
            <div>
                <TodoForm />
                <TodoList todos={this.state.todos}/>
            </div>
        )
    }
});

module.exports = TodoDashboard;
