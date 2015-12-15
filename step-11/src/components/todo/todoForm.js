var React = require('react');
var uuid = require('uuid');

var TodoForm = React.createClass({

    getInitialState: function () {
        return {
            title: "",
            titleValidationErrorMessage: null,
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

    validateTitle: function() {
        return this.refs.title.value && this.refs.title.value !== '';
    },

    createTodo: function (e) {
        e.preventDefault();
        if (!this.validateTitle()) {
            this.setState({titleValidationErrorMessage: "Le titre est obligatoire"});
        } else {
            this.props.createTodo({
                title: this.state.title,
                description: this.state.description
            });
            this.setState(this.getInitialState());
        }
    },

    renderTitleValidationErrorMessage: function() {
        if (this.state.titleValidationErrorMessage) {
            return <span className="error-message">{this.state.titleValidationErrorMessage}</span>
        }
    },

    render: function () {
        return (
            <div>
                <form className="pure-form pure-form-stacked" onSubmit={this.createTodo}>
                    <fieldset>
                        <label htmlFor="title"><b>Titre *</b></label>
                        <input id="title" ref="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            className={this.state.titleValidationErrorMessage ? "input-error" : ""}
                        />
                        {this.renderTitleValidationErrorMessage()}

                        <label htmlFor="description">Description</label>
                        <textarea id="description"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                        />

                        <button type="submit" className="pure-button pure-button-primary">Ajouter</button>
                    </fieldset>
                </form>
            </div>
        )
    }
});

module.exports = TodoForm;
