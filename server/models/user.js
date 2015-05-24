var thinky = require('../utils/thinky.js');
var type = thinky.type;


var User = thinky.createModel("User",{
    id      : type.string(),
    email   : type.string().email(),
    groupId : type.string(),
    ownerId : type.string(),
    username: type.string()
});

module.exports = User;



