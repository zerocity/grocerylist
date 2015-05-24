var thinky = require('../utils/thinky.js');
var type = thinky.type;


var Group = thinky.createModel("Group",{
    id: type.string(),
    settings: type.object()
});

module.exports = Group;
