var thinky = require('../util/thinky.js');
var type = thinky.type;

var User = thinky.createModel("User",{
    id      : type.string(),
    groupId : type.string(),
    ownerId : type.string(),
    username: type.string(),
    email   : type.string().email()
});

module.exports = User;



