var React = require('react');
import Map from './Map';

var Front = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome to UberSF!</h1>
        <Map/>
      </div>
    );
  }
});

module.exports = Front;
