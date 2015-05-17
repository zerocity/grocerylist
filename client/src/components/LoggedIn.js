'use strict';
var React = require('react');
var Api = require('./api');

var LoggedIn = React.createClass({
  callApi: function() {
    Api.hello().then(function(res) {
        console.log(res);
    },function(err) {
        console.log(err);
    });
  },
  getInitialState: function() {
    return {
      profile: null
    };
  },
  componentDidMount: function() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
      }
      this.setState({profile: profile});
    }.bind(this));
  },
  render: function() {
    if (this.state.profile) {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
          <img src={this.state.profile.picture} />
          <h2>Welcome {this.state.profile.nickname}</h2>
          <button onClick={this.callApi} className="btn btn-lg btn-primary">Call API</button>
        </div>);
    } else {
      return (
        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
        </div>);
    }
  }
});


module.exports = LoggedIn;
