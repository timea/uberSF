var React = require('react');

var Clock = React.createClass({
  getDefaultProps: function() {
    totalSeconds: 0
  },
  propTypes: {
    totalSeconds: React.PropTypes.number
  },
  formatSeconds: function (totalSeconds) {
    var minutes = Math.floor(totalSeconds/60);
    var seconds = totalSeconds - (minutes * 60);

    if(minutes < 10) {
      minutes = "0"+ minutes
    }

    if(seconds < 10) {
      seconds = "0"+ seconds
    }
    return minutes + ":" + seconds;
  },
  render: function() {
    var {totalSeconds} = this.props;
    return (
      <div className="clock">
        <span className="clock-text">
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
});

module.exports = Clock;
