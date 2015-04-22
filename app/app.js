import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import HomeHandler from './components/Home.js';
import LoginHandler from './components/Login.js';

let App = React.createClass({
  render() {
    return (
      <div className="twelve wide centered column">
  			<h1 className="two column row">
  	      <div className="right floated column">Image Upload</div>
  	      <div className="left floated column">
            <Link to="app">
              <img className="ui middle aligned image" src="/images/logos.png"></img>
            </Link>
  				</div>
  	    </h1>
  			<div className="one column row">
  				<div className="ui clearing divider"></div>
  			</div>
        {/* this is the importTant part */}
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" path="/home" handler={HomeHandler}/>
    <Route name="login" path="/login" handler={LoginHandler}/>
    <DefaultRoute handler={HomeHandler}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('react-app'));
});
