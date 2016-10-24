import React from 'react';
import GoogleApiComponent from './GoogleApiComponent';

export class Container extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Map google={this.props.google}/>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(Container)
