/* eslint no-undef:0, react/jsx-max-props-per-line:0 */

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var expect = chai.expect;

var Todo = require('../../../src/components/todo/todo');

describe('Todo', function() {
    it('affiche le texte de la tâche', function() {
        var todo = {
            id: '123-4567-890',
            title: 'Test',
            description: 'Une tâche de test',
            status: 'NEW'
        };
        // TODO use mock function
        var updateTodoCalled = false;
        var updateTodo = function() {
            updateTodoCalled = true;
        }
        var todoComponent = ReactTestUtils.renderIntoDocument(<Todo todo={todo} updateTodo={updateTodo}/>);

        var h3 = ReactTestUtils.findRenderedDOMComponentWithTag(todoComponent, 'h3');
        expect(h3.textContent).to.be.equal('[Nouveau] Test');

        var button = ReactTestUtils.findRenderedDOMComponentWithTag(todoComponent, 'button');
        ReactTestUtils.Simulate.click(button);
        expect(updateTodoCalled).to.be.true;
    });
});
