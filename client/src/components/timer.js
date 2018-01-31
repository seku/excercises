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
    if (!!this.props.isRunning) {
      this.props.pauseTimer()
    } else {
      this.props.startTimer()
    }
  }
  render() {
    let actionText;
    if (!!this.props.isRunning) {
      actionText = 'Pause'
    } else {
      if (this.props.totalElapsed === 0) {
        actionText = 'Start'
      } else {
        actionText = 'Resume'
      }
    }
    const elapsedString = helpers.secondsToHuman(this.props.totalElapsed)
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
        <div className='ui two bottom attached buttons'>
          <div className='ui basic button blue' onClick={this.toggleRunning}>
            {actionText}
          </div>
          <button className='ui basic button red' onClick={this.props.stopTimer}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}
