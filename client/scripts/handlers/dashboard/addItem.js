'use strict';
var React = require('react');
var Item = require('./item');
var actions = require('../../actions/ListsActions');
var cx = require('classnames');

var AddItem = React.createClass({
  getInitialState: function() {
    console.log('init');
    return {newItem:true,saved:false};
  },
  sendNewItem:function() {
    var value = this.refs.newitem.getDOMNode().value.trim();

    actions.createItem({
      id:this.props.listId,
      item:{
        "title":value,
        "done":false,
        "date"  :  new Date()
      }
    });
    //this.setState({saved:false});
    this.refs.newitem.getDOMNode().value = "";
  },
  addItem:function (){
    if (!this.state.newItem) {
      this.sendNewItem();
    }else{
      console.log("open");
      this.setState({ newItem: !this.state.newItem });
    }
  },
  componentDidUpdate:function() {
    console.log('Update !!!');
    console.log(this.state);
    if (!this.state.newItem) {

      if(!this.state.saved){
        this.setState({saved:true});
        React.findDOMNode(this.refs.newitem).focus();
      }

    };
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
                  <input placeholder="Name Your Item" tabIndex="-1" ref="newitem" type="text" onKeyUp={this.handlerOnEnter} /></span>
              </section>
              <section className="list-actions">
                <a onClick={this.addItem} className="list-actions--button-addItem ios"> Add Item </a>
              </section>
            </section>);

  /* jshint ignore:end */
    }
});

module.exports = AddItem;
