var thinky = require('../../utils/thinky');
var Model = require('../../models');
var moment = require('moment');
var Promise = require('bluebird');

function log (msg) {
  console.log(msg);
  return msg;
};

function createNewGroup (user) {
  console.log("CREATE GROUP");
  return new Model.Group({users:[user]}).saveAll();
}

function createNewList (group) {
  console.log("CREATE List");
  var title = moment().format("dddd LL");
  var list =  new Model.List({
      name: title,
      date: new Date()
    });

  return Promise
    .resolve(group)
    .then(createNewParticipants)
    .all()
    .then(log)
    .then(function(participants) {
      list.participants = participants;
      list.groupId = group.id;
      return list
    })
    .then(log)
    .then(function(list) {
      return list.saveAll();
    });
}

function createNewParticipants (group) {
  console.log("CREATE Participants");

  var participants = []
  group.users.forEach(function(user) {
    var participant = new Model.Participant({
      date:new Date(),
      expenses: 0,
      user: user
    }).save();
    participants.push(participant);
  });

  return participants
}

function createOrFindUser (profile) {
  return Model.User.filter({'email':profile.email})
    .run()
    .then(function(users) {
      if (users.length == 0) {
        console.log("CREATE USER",profile.email);
        return new Model.User({
          "username":profile.name,
          "email":profile.email
        })
        .save()
        .then(createNewGroup)
        .then(createNewList);
      }else{
        return Model.List
          .getAll(users[0].groupId,{'index':'groupId'})
          .getJoin()
          .run()
          .then(log)

/*        return Model.Group.get(users[0].groupId).getJoin({
          "lists":true,
        }).run().then(function (group) {
          return Model.List.get(group.lists[0].id).getJoin({
            "items":true,
            "participants":true
          });
        });
*/

      };
  });
}

/*  console.log('JOIN OF GROUPS');
  return Model.Group.get(res.groupId).getJoin({
    "users":true,
    "lists":true
  }).run()*/

module.exports = createOrFindUser;
