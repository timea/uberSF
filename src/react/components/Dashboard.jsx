import React from 'react';
import Score from './Score';
import Timer from './Timer';

class Dashboard extends React.Component {
  render () {
    return(
      <div className="dashboard">
        <Score score={this.props.score}/>
        <Timer timerStatus={this.props.timerState} count={this.props.count}/>
      </div>
    );
  }
}
export default Dashboard;
