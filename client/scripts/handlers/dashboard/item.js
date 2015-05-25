'use strict';
var React = require('react');
var actions = require('../../actions/ListsActions');
var cx = require('classnames');

var Item = React.createClass({
  getInitialState: function() {
    return {actionHide:true};
  },
  componentDidMount:function() {
    //console.log('Mount');
  },
  changeState:function(res) {
    this.props.item.done = !this.props.item.done;
    actions.itemUpdate(this.props.item);
  },
  toggleActionPanel:function() {
    this.setState({ actionHide: !this.state.actionHide });
    console.log(this.state.actionHide);
  },
  removeItem:function() {
    console.log(this.props.item);
    actions.removeItem(this.props.item);
  },
  render: function(){
    var item = this.props.item;
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
          <span className="list-item--description">{item.title}</span>
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
