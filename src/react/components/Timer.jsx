import React from 'react';
import Clock from './Clock';
import Controls from './Controls';


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStatus: 'stopped'};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.props === nextProps) && (this.state === nextState)){
            return false;
        }
          return true;
    }

  render() {
    return (
      <div className="clock">
        <Clock totalSeconds={this.props.count}/>
      </div>
    )
  }
}

export default Timer;
