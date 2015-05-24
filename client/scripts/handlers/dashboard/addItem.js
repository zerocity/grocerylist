'use strict';
var React = require('react');
var Item = require('./item');
var actions = require('../../actions/ListsActions');

var List = React.createClass({
  addItem:function() {
    var value = this.refs.item.getDOMNode().value.trim();
    if (value.length > 0) {

      actions.createItem({
        id:this.props.listId,
        item:{
          "title":value,
          "done":false,
          "date"  :  new Date()
        }
      });
      this.refs.item.getDOMNode().value = "";
    };
  },
  render: function(){
    console.log(this.props.listId);
  /* jshint ignore:start */
    return (<ul>
              <li><input ref="item" type="text" /> <span onClick={this.addItem}> add Item </span></li>
            </ul>);
  /* jshint ignore:end */
    }
});

module.exports = List;
