'use strict';
var React = require('react');
var actions = require('../../actions/ListsActions');
var cx = require('classnames');
var update = require('react/addons').addons.update;


var Item = React.createClass({
  getInitialState: function() {
    return {
      actionHide:true,
      edit:false,
      item:this.props.item
    };
  },
  componentDidMount:function() {
    //console.log('Mount');
  },
  changeState:function(res) {
    var newState = update(this.state,{
      item: {done: {$set: !this.state.item.done}}
    });
    this.setState(newState);
    actions.itemUpdate(this.state.item);
  },
  toggleActionPanel:function() {
    this.setState({ actionHide: !this.state.actionHide });
    console.log(this.state.actionHide);
  },
  removeItem:function() {
    actions.removeItem(this.props.item);
  },
  saveHandler:function() {
    if (this.state.item !== this.props.item) {
      actions.itemUpdate(this.state.item);
    }
  },
  saveOnEnter:function(event) {
    if (event.keyCode === 13) {
      React.findDOMNode(this.refs.item).blur();
    }
  },
  editHandler:function() {
    var newState = update(this.state,{
      item: {title: {$set: event.target.value}}
    });
    this.setState(newState);
  },
  render: function(){
    var item = this.state.item;
    var checkboxClass = cx({
        'list-item--checkbox':true,
        'icon-task-check':true,
        'ios':true,
        'unchecked': !item.done
      });

    var actionPanelClass = cx({
      'list-item--actions':true,
      'open':!this.state.actionHide
    });

    var hide = {
      'display': (this.state.actionHide) ? 'none' : null
    };



    /* jshint ignore:start */
    return (
      <section className="list-item">
          <span
            className={checkboxClass}
            onClick={this.changeState}></span>
          <span className="list-item--description" >
            <input ref="item" type="text" value={item.title} onBlur={this.saveHandler} onKeyUp={this.saveOnEnter} onChange={this.editHandler}/>
          </span>
          <section className={actionPanelClass}>
              <span className="action icon-chevron-right-thick ios" onClick={this.toggleActionPanel}></span>
              <span style={hide} className="action ios icon-compose"></span>
              <span style={hide} className="action ios icon-user-1"></span>
              <span style={hide} className="action ios icon-trash-can" onClick={this.removeItem}></span>
          </section>
      </section>);
    /* jshint ignore:end */
  }
});

module.exports = Item;
