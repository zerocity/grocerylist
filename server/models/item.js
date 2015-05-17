var thinky = require('../util/thinky.js');
var type = thinky.type;

var Items = thinky.createModel("Items",{
    id: type.string(),
    listId: type.string(),
    title: type.string(),
    price: type.number(),
    date: type.date()
});

module.exports = Items;