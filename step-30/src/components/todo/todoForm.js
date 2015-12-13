var React = require('react');
var uuid = require('uuid');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var TodoForm = React.createClass({

    mixins: [FluxMixin],

    getInitialState: function () {
        return {
            text: ""
        }
    },

    handleTextChange: function (e) {
        this.setState({
            text: e.target.value
        })
    },

    createTodo: function () {
        if (this.state.text.trim()) {
            this.getFlux().actions.addTodo(this.state.text);
            this.setState({text: ""});
        }
    },

    render: function () {
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.handleTextChange}/>
                <button onClick={this.createTodo}>Ajouter</button>
            </div>
        )
    }
});

module.exports = TodoForm;
