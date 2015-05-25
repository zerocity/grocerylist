'use strict';
var React = require('react');
var Item = require('./item');
var actions = require('../../actions/ListsActions');
var cx = require('classnames');

var AddItem = React.createClass({
  getInitialState: function() {
    console.log('init');
    return {newItem:true,actionHide:true};
  },
  sendNewItem:function() {
    var value = this.refs.item.getDOMNode().value.trim();

    actions.createItem({
      id:this.props.listId,
      item:{
        "title":value,
        "done":false,
        "date"  :  new Date()
      }
    });
    this.refs.item.getDOMNode().value = "";
  },
  addItem:function (){
    if (!this.state.newItem) {
      this.sendNewItem();
    }else{
      console.log("open");
      this.setState({ newItem: !this.state.newItem });
      React.findDOMNode(this.refs.theInput).focus();
    }
  },
  handlerOnEnter:function() {
    if (event.keyCode === 13) {
      this.sendNewItem();
    }
  },
  render: function(){

    var hideNew = {
      'display': (this.state.newItem) ? 'none' : null
    };

    var hideAddNew = (!this.state.newItem) ? 'Save' : 'Add Item';

    var item = this.props.item;
    var checkboxClass = cx({
        'list-item--checkbox':true,
        'icon-task-check':true,
        'ios':true,
        'unchecked': true
      });

    var actionPanelClass = cx({
      'list-item--actions':true,
      'open':false
    });
  /* jshint ignore:start */
    return (<section>
              <section style={hideNew} className="list-item">
                  <span className={checkboxClass}></span>
                  <span className="list-item--description">
                  <input ref="item" type="text" onKeyUp={this.handlerOnEnter}/></span>
              </section>
              <section className="list-actions">
                <a onClick={this.addItem} className="list-actions--button-addItem ios"> Add Item </a>
              </section>
            </section>);

  /* jshint ignore:end */
    }
});

module.exports = AddItem;
