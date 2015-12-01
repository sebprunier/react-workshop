var React = require('react');

var Todo = React.createClass({
    render: function () {
        return (
            <div className="todo">
                Ceci est une tâche à réaliser.
            </div>
        );
    }
});

module.exports = Todo;
