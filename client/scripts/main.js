'use strict';
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var AppHandler        = require('./handlers/root'),
    DashboardHandler  = require('./handlers/dashboard');

// declare our routes and their hierarchy
  /* jshint ignore:start */
var routes = (
  <Route name="login" path="/" handler={AppHandler}>
      <Route name="invide" path="/invide" handler={DashboardHandler} action="grocery" />
      <Route name="dashboard" path="/dashboard" handler={DashboardHandler} action="grocery" />
  </Route>
);


Router.run(routes, Router.HistoryLocation, function (Root) {
  React.render(<Root/>, document.getElementById('app-wrapper'));
});
  /* jshint ignore:end */
