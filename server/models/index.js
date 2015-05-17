var thinky = require('../util/thinky.js');
var type = thinky.type;


var User        = require('./user'),
    Group       = require('./group'),
    List        = require('./list'),
    Item        = require('./item'),
    Participant = require('./participant')

Group.hasMany(User,"users","id","groupId");
Group.hasMany(List,"lists","id","groupId");

User.belongsTo(Group,"group","groupId","id");

List.hasMany(Item,"items","id","listId");
List.hasMany(Participant,"participants","id","listId");

Item.belongsTo(User,"owner","ownerId","id");

module.exports = {
  "User":User,
  "Group":Group,
  "List":List,
  "Participant":Participant,
  "Item":Item
};
