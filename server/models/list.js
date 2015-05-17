var thinky = require('../util/thinky.js');
var type = thinky.type;

var List = thinky.createModel("List",{
    id            : type.string(),
    totalExpenses : type.number(),
    date          : type.date()
});

module.exports = List;



