'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Home = require('./Home');
var LoggedIn = require('./LoggedIn');

var App = React.createClass({
  componentWillMount: function() {
    console.log('Mount');
    this.lock = new Auth0Lock('kenWrDFGwUHGLPP5hOjYbhIelkLre61K', 'grocerylist.auth0.com');
    this.setState({idToken: this.getIdToken()});
  },
  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },
  render: function() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (
        <div>
            <Home lock={this.lock} />
            <RouteHandler/>
        </div>);
    }
  }
});

module.exports = App;
