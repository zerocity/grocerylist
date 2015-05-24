'use strict';
var React = require('react');
var actions = require('../../actions/ListsActions');

var Item = React.createClass({
  changeState:function(res) {
    this.props.item.done = !this.props.item.done;
    actions.itemUpdate(this.props.item);
  },
  render: function(){
    var item = this.props.item;
    /* jshint ignore:start */
    return (
        <li onClick={this.changeState}>
          {item.title}
          <span >{item.done || 'FALSE'}</span>
        </li>
    );
    /* jshint ignore:end */
  }
});

module.exports = Item;
