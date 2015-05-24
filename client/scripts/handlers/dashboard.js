'use strict';
var React = require('react');
var Reflux = require('reflux');
var ListStore = require('../store/ListStore');
var actions = require('../actions/ListsActions');

var Lists = require('./dashboard/lists');
var AddItem = require('./dashboard/addItem');

var DashBoard = React.createClass({
  mixins: [Reflux.ListenerMixin,Reflux.connect(ListStore)],
  onListsChange:function(lists) {
    console.log('GOT DATA',lists);
  },
  componentDidMount: function() {
    this.listenTo(ListStore, this.onListsChange);
  },
  handlerClick:function() {
    actions.getLists();
  },
  render: function(){
    /* jshint ignore:start */
    if (!this.state.login) {
      return <p>please login</p>
    }
    var lists = this.state.lists[0]
    if (typeof lists === 'undefined') {
      return <h1>Loading ...</h1>
    }else{
      return (
        <div>
          <h1 onClick={this.handlerClick} >{lists.name}</h1>
          <Lists key={lists.id} lists={lists} />
          <AddItem listId={lists.id}/>
        </div>
      );
    }
    /* jshint ignore:end */
  }
});

module.exports = DashBoard;
