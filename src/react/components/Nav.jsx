var React = require('react');

var Nav = React.createClass({
  render: function() {
    return (
      <div>
        <div className="panel clearfix">
            <a className="button" href="#/movies">Movies</a>
            <a className="button float-center hollow" href="#/">Logo</a>
            <a className="button float-right" href="#/duck">Duck</a>
        </div>
      </div>
    );
  }
});

module.exports = Nav;
