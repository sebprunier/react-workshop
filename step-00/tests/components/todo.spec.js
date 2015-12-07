/* eslint no-undef:0 */

var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var expect = chai.expect;

var Todo = require('../../src/components/todo');

describe('Todo', function() {
  it('affiche le texte de la tâche', function() {
    var todo = ReactTestUtils.renderIntoDocument(<Todo text="Un Todo de test..."/>);
    var div = ReactTestUtils.findRenderedDOMComponentWithTag(todo, 'div');
    expect(div.textContent).to.be.equal('Un Todo de test...');
  });
});
