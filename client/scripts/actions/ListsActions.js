'use strict';
var Reflux = require('reflux');


var actions = Reflux.createActions([
  "getLists",
  "itemUpdate",
  "createItem",
  "removeItem",
  "createOrFindUser"]);

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

actions.itemUpdate.listen(function(item) {
  console.log(item);
  return request
    .put(API_HOST+"/api/item/")
    .set(auth())
    .send(item)
    .then(actions.itemUpdate.completed)
    .error(function(err) {
      console.log('ASDASD');
    });
});

actions.removeItem.listen(function(item) {
  console.log(item);
  return request
    .del(API_HOST+"/api/item/")
    .set(auth())
    .send(item)
    .then(actions.removeItem.completed)
    .error(function(err) {
      console.log('ASDASD');
    });
});

module.exports = actions;
