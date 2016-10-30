var React = require('react');
import WitchMap from './WitchMap';

var Front = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Welcome to UberSF!</h1>
        <WitchMap/>
      </div>
    );
  }
});

module.exports = Front;
