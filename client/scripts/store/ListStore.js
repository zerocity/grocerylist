'use strict';
var Reflux = require('reflux');
var actions = require('../actions/ListsActions');

var request = require('superagent-bluebird-promise');
var API_HOST = 'http://192.168.0.15:9010';

var auth = function () {
  var token ;
  if (localStorage.getItem('userToken') === null) {
    return {}
  }else{
    token = localStorage.getItem('userToken');
    return {'Authorization': 'Bearer ' + token};
  }
}

var error = function(msg) {
  console.log(msg);
  return msg
};

var RequestStore = Reflux.createStore({
  data:{
    login:false,
    lists:[]
  },
  init: function() {
    this.listenTo(actions.getLists, this.onGetLists);
    this.listenTo(actions.itemUpdate, this.onItemUpdate);
    this.listenTo(actions.removeItem, this.onRemoveItem);
    this.listenTo(actions.createOrFindUser, this.onCreateOrFindUser);
    this.listenTo(actions.createItem, this.onCreateItem);
  },
  getInitialState:function() {
    return this.data;
  },
  onGetLists:function() {
    var that = this;
    request
      .get(API_HOST + '/api')
      .set(auth())
      .then(function(res) {
        var lists = res.body;
        that.data.login = true;
        that.data.lists = lists;
        that.trigger(that.data)
      },function(err) {
        console.log(err);
        that.data.login = false;
      });
  },
  onItemUpdate:function(updated) {
    this.data.lists[0].items = this.data.lists[0].items.map(function(item) {
      return (item.id == updated.id) ? updated : item;
    });
    this.trigger(this.data);
  },
  onRemoveItem:function(deleted) {
    console.log(deleted);
    this.data.lists[0].items = this.data.lists[0].items.map(function(item) {
      if (item.id == deleted.id) {
        console.log(item);
      };


      //return (item.id == deleted.id) ? del deleted : item;
    });
    //this.trigger(this.data);
  },
  onCreateOrFindUser:function(profile,err) {
    var that = this;
    request
      .post(API_HOST+"/api/user/")
      .set(auth())
      .send(profile)
      .then(function(res) {
        var lists = res.body;
        that.data.login = true;
        that.data.lists = lists;
        that.trigger(that.data)
      })
      .error(error);
  },
  onCreateItem:function(item) {
    var that = this;
    return request
      .post(API_HOST+"/api/item/")
      .set(auth())
      .send(item)
      .then(function(res) {
        var item = res.body;
        that.data.lists.filter(function(list) {
          if (list.id === item.listId) {
            list.items.push(item);
          };
        })
        that.trigger(that.data);
      })
      .error(error);
  }
});

module.exports = RequestStore;
