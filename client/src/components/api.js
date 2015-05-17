'use strict';

var rest = require('rest'),
    server = "http://localhost:3001",
    defaultRequest = require('rest/interceptor/defaultRequest');

var client = rest.wrap(defaultRequest, {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('userToken')
        }
    }
);

var Api = {
    hello :function() {
        return client(server + '/hello');
    },
    lists : function() {
        return client(server + '/lists');
    }
};

module.exports = Api;
