#!/usr/bin/node
var thinky = require(__dirname+'/util/thinky.js');
var Model = require('./models');
var consolere = require('console-remote-client').connect('console.re','80','rethink');


var map = new Model.Map({"name":"hello wolrd"});
// Create fields

var entities = []
var count = 0;


for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
        if (count<50) {
          count++;
          entities.push(new Model.Entity({"status": "unclaimed",type:"titl1", "posX": x, "posY": y}))
        }else{
          entities.push(new Model.Entity({"status": "unclaimed",type:"titl2", "posX": x, "posY": y}))
        }
    }
}

map.entities = entities;
map.saveAll().then(function(res) {
    console.log('RETURN FROM SAVE ALL');
    process.exit();
},function(error) {
  console.log('Database tables and entries could not be created');
  console.log(error);
  process.exit(1);
});
