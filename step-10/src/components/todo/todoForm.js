var React = require('react');
var uuid = require('uuid');

var TodoForm = React.createClass({

    getInitialState: function () {
        return {
            title: "",
            description: ""
        }
    },

    handleTitleChange: function (e) {
        this.setState({
            title: e.target.value
        })
    },
    handleDescriptionChange: function (e) {
        this.setState({
            description: e.target.value
        })
    },

    createTodo: function (e) {
        e.preventDefault();
        this.props.createTodo({
            id: uuid.v4(),
            title: this.state.title,
            description: this.state.description,
            status: "NEW"
        });
        this.setState(this.getInitialState());
    },

    render: function () {
        return (
            <div>
                <form className="pure-form pure-form-stacked" onSubmit={this.createTodo}>
                    <fieldset>
                        <label htmlFor="title">Titre</label>
                        <input id="title" type="text" value={this.state.title} onChange={this.handleTitleChange}/>

                        <label htmlFor="description">Texte</label>
                        <textarea id="description" value={this.state.description} onChange={this.handleDescriptionChange}/>

                        <button type="submit" className="pure-button pure-button-primary">Ajouter</button>
                    </fieldset>
                </form>
            </div>
        )
    }
});

module.exports = TodoForm;
