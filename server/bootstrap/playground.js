var thinky = require(__dirname+'/../util/thinky.js');
var Model = require('../models');
var Promise = require('bluebird');
var gID = "";

function log(res) {
  console.log(res);
  return res;
}

function print (res,msg) {
  console.log(msg);
  return res
};

function createUsers () {
  for (var i = 0; i < 12; i++) {
    new Model.User({"username":"Max" + i}).save(function() {
      console.info("Users created ",r);
      return ;
    },function(err) {
      console.log("Error:",err);
      process.exit(1);
    });
  }
}

function error(error) {
  console.error(error);
}

function getUsers () {
  return Model.User.run();
};

function createGroups (users) {
  console.log("CREATE GROUPS");
  var maxGroups =  users.length / 3;
  var groups = [];

  for (var i = 0; i < maxGroups; i++) {
    var members = users.splice(0,3);
    var group =  new Model.Group({"settings":{"view":"month"}});
    group.users = members;
    group.saveAll();
    groups.push(group);
  }
  return groups;
};

function waitForSavedGroups (groups) {
  return Promise.all(groups).then(function(g) {
    console.log('GROUP',g);
    console.log('####');
    return g
  });
};

function exit () {
  console.log("Exit , bye bye :)");
  process.exit(0);
};

function getAllGroups () {
  return Model.Group.getJoin().run();
};

function limitToOneGroup (groups) {
  return groups[0];
};

function getGroup (id) {
  return Model.Group.get(id).getJoin().run().then(function(g) {
    console.log(g);
  }).then(exit)
};

function createUsers (){
  console.log('CREATE USERS');
  var users = [];
  for (var i = 0; i < 12; i++) {
    users.push(
      new Model.User({"username":"Max" + i}).save().then(function(s) {
        console.log('SAVED ',s);
      })
    );
  }
  return users
};

function groups (g) {
  console.log('groups --> ',g);
  if (typeof g === "undefined") {
    return getUsers()
     .then(createGroups)
     .then(waitForSavedGroups)
     .then(getAllGroups)
     .then(log)
     .then(limitToOneGroup)
     .then(log)
     .then(exit)
  //   .then(getGroup(gID))
  }else{
    getAllGroups
      .then(log)
      .then(exit);
  }
};

function main () {
  console.log('MAIN STARTED');
  Model.User.count()
    .then(function (count) {
      console.log(count);
      if (count == 0 ) {
        createUsers();
        new Promise
          .delay(3000)
          .then(exit);
      }else{
        Model.Group.count().then(function(gc) {
          if (gc == 0) {
            groups();
          }else{
            console.log(gc);
          }
        });
      }
    })
    .error(createUsers)
};

main();