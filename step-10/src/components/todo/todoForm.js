var React = require('react');
var uuid = require('uuid');

var TodoForm = React.createClass({

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
        this.props.createTodo({
            id: uuid.v4(),
            text: this.state.text,
            status: "NEW"
        });
        this.setState(this.getInitialState());
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
