'use strict';
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var actions = require('../actions/ListsActions');
var Navigation = require('react-router').Navigation;

var Root = React.createClass({
  mixins: [Navigation],
  componentWillMount: function() {
    this.lock = new Auth0Lock('kenWrDFGwUHGLPP5hOjYbhIelkLre61K', 'grocerylist.auth0.com');
    this.setState({idToken: this.getIdToken()})

    var that = this;

    if (this.getIdToken()) {
      this.lock.getProfile(this.getIdToken(),function(err,profile) {
          if (err) {
            console.log(err);
            localStorage.clear();
          }else{
            actions.createOrFindUser(profile);
            that.transitionTo('dashboard');
          }
      });
    }else{
      this.transitionTo('login');
    }

  },
  showLock: function() {
    // We receive lock from the parent component in this case
    // If you instantiate it in this component, just do this.lock.show()
    this.lock.show();
    //this.lock.getClient().login({connection: 'google-oauth2'});
    //lock.logout({ ref: window.location.href });
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
  home:function() {
    var home = (<div>
      <section className="view">
          <header>
              <h1 className="logo"><span className="icon-shopping-basket"></span> Grocery List</h1>
          </header>
          <section className="introduction">
              <h2>What is Grocery List?</h2>
              <p>Grocery List helps your flat sharing community to organise your grocery shopping. </p>
              <p>It also calculates the shared expenses and makes it easy to find out how much room mate payed or owes the community.</p>
          </section>
          <section className="buttons-login">
              <h3>Sign Up or Login In with</h3>
              <a onClick={this.showLock} className="button-googleLogin ios" >Google+</a>
              <a className="button-facebookLogin">Facebook</a>
          </section>
      </section>
    </div>);
    return home
  },
  render: function(){
    console.log('app');
    /* jshint ignore:start */
      if (!this.getIdToken()) {
        return this.home()
      }else{
        return (<RouteHandler lock={this.lock} />)
      }
    /* jshint ignore:end */
  }
});

module.exports = Root;
