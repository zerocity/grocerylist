'use strict';
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var actions = require('../actions/ListsActions');


var Root = React.createClass({
  componentWillMount: function() {
    this.lock = new Auth0Lock('kenWrDFGwUHGLPP5hOjYbhIelkLre61K', 'grocerylist.auth0.com');
    this.setState({idToken: this.getIdToken()})
    if (this.getIdToken()) {
      this.lock.getProfile(this.getIdToken(),function(err,profile) {
          if (err) {
            console.log(err);
          }else{
            actions.createOrFindUser(profile)
          }
      });
    };

  },
  showLock: function() {
    // We receive lock from the parent component in this case
    // If you instantiate it in this component, just do this.lock.show()
    this.lock.show();
  },
  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  },
  render: function(){
    return (
      /* jshint ignore:start */
      <div>
        <h1>AppHandler</h1>
        <a onClick={this.showLock}>Sign In</a>
        <RouteHandler lock={this.lock} />
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Root;
