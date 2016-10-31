import React from 'react';
import Score from './Score';
import Timer from './Timer';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return(
      <div className="dashboard">
        <Score score={this.props.score}/>
        <Timer timerStatus={this.props.timerState} count={this.props.count}/>
        <div className="info">Please see the movie locations you flew by below</div>
      </div>
    );
  }
}
export default Dashboard;
