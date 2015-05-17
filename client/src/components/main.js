'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;


var Routes = (
  <Route handler={require('./App')}>
    <Route name="success" handler={require('./LoggedIn')}/>
  </Route>
);

Router.run(Routes,Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
