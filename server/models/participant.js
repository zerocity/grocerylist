var thinky = require('../util/thinky.js');
var type = thinky.type;

var Participant = thinky.createModel("Participant",{
    id: type.string(),
    listId: type.string(),
    expenses:type.number(),
    date:type.date()
});

module.exports = Participant;