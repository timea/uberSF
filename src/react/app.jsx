var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Front = require('Front');

// load foundation
$(document).foundation();

// load CSS
require('style!css!sass!applicationStyles')


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Front}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
