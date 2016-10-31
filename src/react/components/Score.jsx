import React from 'react';

class Score extends React.Component {
  render () {
    return(
      <div className="points-container">
        <p className="points">
          {this.props.score}
        </p>
        <p className="text">points</p>
      </div>
    );
  }
}
export default Score;
