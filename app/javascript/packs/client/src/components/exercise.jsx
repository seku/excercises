import React from 'react';
import * as helpers from './../helpers'
// import startSoundFile from './start_sound.mp3'
// import pauseSoundFile from './../sounds/pause_sound.mp3'
const startSoundFile = require("file-loader!./../sounds/start_sound.mp3")
const pauseSoundFile = require("file-loader!./../sounds/pause_sound.mp3")

export default class Exercise extends React.Component {
  state = {
    isDurationFinished: false,
    isPauseFinished: false
  }
  componentDidUpdate = () => {
    if (this.state.isPauseFinished && this.props.elapsed === 0) {
      this.setState({
        isDurationFinished: false,
        isPauseFinished: false
      })
    } else if (!this.state.isDurationFinished && this.props.elapsed === this.props.duration) {
      this.playPauseSound()
      this.setState({isDurationFinished: true})
    } else if (!this.state.isPauseFinished && (this.props.pause + this.props.duration === this.props.elapsed)) {
      this.playStartSound()
      this.setState({isPauseFinished: true})
    }
  }
  playStartSound = () => {
    const startSound = new Audio(startSoundFile)
    startSound.play()
  }
  playPauseSound = () => {
    const pauseSound = new Audio(pauseSoundFile)
    pauseSound.play()
  }
  durationLeft = () => {
    const elapsed      = this.props.elapsed
    const duration     = this.props.duration
    const durationLeft = (duration - elapsed > 0) ? (duration - elapsed) : 0
    return helpers.formattedSecondsToMoment(durationLeft)
  }
  pauseLeft = () => {
    const elapsed      = this.props.elapsed
    const duration     = this.props.duration
    const pause        = this.props.pause
    const pauseLeft = (duration - elapsed > 0) ? pause : (pause + (duration - elapsed))
    return helpers.formattedSecondsToMoment(pauseLeft)
  }
  isFinished = () => {
    let styles
    if (this.state.isDurationFinished) {
      styles = {
        border: '1px solid red'
      }
    }
    return styles
  }
  render() {
    return (
      <div className='ui centered card' style={this.isFinished()}>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='header'>
            Duration: {helpers.formattedSecondsToMoment(this.props.duration)}
          </div>
          <div className='header'>
            Pause: {helpers.formattedSecondsToMoment(this.props.pause)}
          </div>
          <div className='header'>
            Duration left: {this.durationLeft()}
          </div>
          <div className='header'>
            Pause left: {this.pauseLeft()}
          </div>
          <div className='extra content'>
            <span className='right floated edit icon' onClick={this.props.displayEdit}>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon' onClick={this.props.deleteExercise}>
              <i className='trash icon' />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
