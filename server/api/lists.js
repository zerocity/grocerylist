'use strict';
var thinky = require(__dirname+'/../util/thinky.js');
var Model = require('../models');
var Promise = require('bluebird');

var Api = {};

Api.lists = function() {
  return Model.List.getJoin().run();
}




module.exports = Api;