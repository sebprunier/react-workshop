var React = require('react');
var ReactDOM = require('react-dom');

var TodoDashboard = require('./components/todo/todoDashboard');

ReactDOM.render(
    <TodoDashboard />,
    document.getElementById('main')
);
