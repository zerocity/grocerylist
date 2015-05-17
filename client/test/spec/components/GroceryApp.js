'use strict';

describe('GroceryApp', function () {
  var React = require('react/addons');
  var GroceryApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    GroceryApp = require('components/GroceryApp.js');
    component = React.createElement(GroceryApp);
  });

  it('should create a new instance of GroceryApp', function () {
    expect(component).toBeDefined();
  });
});
