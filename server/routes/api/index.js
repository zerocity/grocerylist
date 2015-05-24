var thinky = require('../../utils/thinky');
var Model = require('../../models');
var moment = require('moment');
var Promise = require('bluebird');
var register = require('./register');
var Api = {};

function log (msg) {
  console.log(msg);
  return msg;
};

Api.dashboard = function (req,res) {
  // Returns all subscribed grosery lists of the current user
  //res.status(200).send();
  Model.List.getJoin().run()
    .then(function(lists) {
      res.json(lists)
    }).catch(function(err) {
      console.log(err);
      res.status(500).send();
    });

}

Api.updateItem = function(req,res) {
  // Update list item.
  // List id is required and new model/change
  console.log('PUT',req.body);
  var item = req.body;
  Model.Item.get(item.id).update(item).run()
    .then(function (updatedItem) {
      console.log('save',updatedItem);
      res.json(updatedItem)
    }).catch(function(err) {
      console.log('err',err);
      res.status(500).send();
    });
};

Api.createOrFindUser = function(req,res) {
  // create an user if not exists and the corresponding group and list
  // it returns an lists of this user
  var profile = req.body;
  var list = register(profile);
  list.then(function(listDoc) {
    res.json(listDoc);
  },function(err) {
    console.log('err',err);
  });
}

Api.createItem = function(req,res) {
  var obj = req.body;

  new Model.Item(obj.item)
    .save()
    .then(function(newItem) {
      return Model.List
        .get(obj.id)
        .getJoin({"items":true})
        .run()
        .then(function(list) {
          list.items.push(newItem);
          list.saveAll();
          newItem.listId = list.id;
          return newItem;
        });
    })
    .then(function(newItem) {
      console.log(newItem);
      res.status(200).json(newItem)
    }).error(log)
    .catch(log);

};

var routes = function(app) {
  app.get('/api/', Api.dashboard);

  app.put('/api/item/',Api.updateItem);

  app.post('/api/item/',Api.createItem);
  app.post('/api/user/',Api.createOrFindUser);
};

module.exports = routes;
