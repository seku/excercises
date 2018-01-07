import React from 'react';
import * as helpers from './../helpers'

export default class TotalTime extends React.Component {
  render() {
    return (
      <div>Total time: {helpers.secondsToHuman(this.props.totalTime)}</div>
    )
  }
}
