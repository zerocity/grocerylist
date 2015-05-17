var thinky = require(__dirname+'/../util/thinky.js');
var consolere = require('console-remote-client').connect('console.re','80','rethink');
var Model = require('../models');
var Promise = require('bluebird');

console.re.log('Connected');

function getRandomIndex () {
  return Math.ceil(Math.random()*100);
}

function createUsers (){
  console.log('CREATE USERS');
  var users = [];
  for (var i = 0; i < 3; i++) {
    var user = new Model.User({"username":"Max" + getRandomIndex()})
    users.push(user);
  }
  return users
};

function createGroups () {
  var group = new Model.Group({});
  var users = createUsers();
  group.users = users;
  return group.saveAll()
}

function log (res) {
  console.log(res);
  console.re.log(res);
  return res
}

function exit () {
  setTimeout(function() {
    console.log("Exit , bye bye :)");
    process.exit(0);
  },3000)
};

function getAllGroups () {
  return Model.Group.run()
};

function limitToOneItem (groups) {
  return groups[0];
};

function getGroupMembers (group) {
  return Model.Group.get(group.id).getJoin().run();
}

function tester (group) {
  group.users.forEach(function(user) {
    console.log('USER ',user.username);
  });
  return group
}

function createList (group) {
  var list =  new Model.List({
    name: "test list",
    date: new Date()
  })

  //
  // Generate List items 
  //

  console.log('CREATE Items');
  var items = [];
  for (var i = 0; i < 10; i++) {
    var item = new Model.Item({
       title : "item " + getRandomIndex(),
       date  :  new Date(),
       done  : false
    });
    items.push(item);
  };

  //
  // Generate Participants
  //

  console.log('CREATE Participants');
  var participants = []

  group.users.forEach(function(user) {
    var participant = new Model.Participant({
      date:new Date(),
      expenses: 0,
      user: user
    });
    participants.push(participant);
  });

  list.items = items;
  list.participants = participants;
  list.groupId = group.id;

  return list.saveAll();
}

function getListJoins (list) {
  return Model.List.get(list.id).getJoin({
    "items":true,
    "participants":true
  }).run()
};

function getGroupJoins (res) {
  console.log('JOIN OF GROUPS');
  return Model.Group.get(res.groupId).getJoin({
    "users":true,
    "lists":true
  }).run()
};

function flowCreateList () {
  console.log("CREAT LIST OBJECT");
  getAllGroups()
    .then(limitToOneItem)
    .then(getGroupMembers)
    .then(createList)
    .then(log)
    .then(exit);
}

function flowCreateGroup () {
  console.log("CREATE GROUP AND USERS");
  createGroups()
    .then(log)
    .then(exit);
}

function flowReadList() {
  console.log("MODE GET LIST OBJECT");
  Model.List.run()
    .then(limitToOneItem)
    .then(getListJoins)
    .then(log)
    .then(getGroupJoins)
    .then(log)
    .then(exit)
}

function flowReadGroup() {
  console.log("MODE GET LIST OBJECT");
  Model.Group.getJoin({"users":true, "lists":true}).run()
    .then(log)
    .then(exit);
}


function main () {
  Model.List
    .count()
    .error(exit)
    .then(function(c) {
      if (c != 0 ) {
        flowReadList();
      }else{
        Model.Group.count().then(function(c) {
          if (c != 0) {
            flowCreateList();
          }else{
            flowCreateGroup();
          }
        });
      }
  });
};

main();
