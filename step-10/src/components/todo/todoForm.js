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

    createTodo: function (e) {
        e.preventDefault();
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
                <form className="pure-form pure-form-stacked" onSubmit={this.createTodo}>
                    <fieldset>
                        <label htmlFor="text">Texte</label>
                        <input id="text" type="text" value={this.state.text} onChange={this.handleTextChange}/>

                        <button type="submit" className="pure-button pure-button-primary">Ajouter</button>
                    </fieldset>
                </form>
            </div>
        )
    }
});

module.exports = TodoForm;
