import React from 'react';
import * as helpers from './../helpers'

export default class Timer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }
  toggleRunning = () => {
    if (!!this.props.runningSince) {
      this.props.stopTimer()
    } else {
      this.props.startTimer()
    }
  }
  render() {
    const elapsedString = helpers.renderElapsedString(
      this.props.elapsed, this.props.runningSince
    )
    const actionText = !!this.props.runningSince ? 'Stop' : 'Start'
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
        </div>
        <div className='ui bottom attached blue basic button' onClick={this.toggleRunning}>
          {actionText}
        </div>
      </div>
    );
  }
}
