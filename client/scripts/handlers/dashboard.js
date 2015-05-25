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
      return (
        <section className="view">
          <header>
            <span className="logoIcon icon-shopping-basket"></span>
            <h1 onClick={this.handlerClick} className="listTitle"> Loading ... </h1>
            <a href="#" className="button-menu icon-settings-wheel"></a>
          </header>
        </section>);
    }

    var lists = this.state.lists[0]
    if (typeof lists === 'undefined') {
      return (
        <section className="view">
          <header>
            <span className="logoIcon icon-shopping-basket"></span>
            <h1 onClick={this.handlerClick} className="listTitle"> No List </h1>
            <a href="#" className="button-menu icon-settings-wheel"></a>
          </header>
        </section>)
    }else{
      return (
        <section className="view">
          <header>
            <span className="logoIcon icon-shopping-basket"></span>
            <h1 onClick={this.handlerClick} className="listTitle"> {lists.name}</h1>
            <a href="#" className="button-menu icon-settings-wheel"></a>
          </header>
          <Lists key={lists.id} lists={lists} />
          <AddItem listId={lists.id}/>
        </section>
      );
    }
    /* jshint ignore:end */
  }
});

module.exports = DashBoard;
