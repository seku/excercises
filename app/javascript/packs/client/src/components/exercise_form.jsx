import React from 'react';
import * as helpers from './../helpers'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker';

export default class ExerciseForm extends React.Component {
  state = {
    id: this.props.id,
    title: this.props.title || 'sex',
    duration: this.props.duration || 5,
    pause: this.props.pause || 2
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  submitForm = () => {
    this.props.submitForm(this.state)
  }
  onDurationChange = (value) => {
    const duration = helpers.momentToSeconds(value)
    this.setState({duration: duration})
  }
  onPauseChange = (value) => {
    const pause = helpers.momentToSeconds(value)
    this.setState({pause: pause})
  }
  render() {
    const submitText = this.state.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' value={this.state.title} name="title" onChange={this.handleChange}/>
            </div>
            <div className='field'>
              <label>Duration</label>
              <TimePicker
                style={{ width: 100 }}
                showSecond={true}
                defaultValue={helpers.secondsToMoment(this.state.duration)}
                className="xxx"
                onChange={this.onDurationChange}
              />
            </div>
            <div className='field'>
              <label>Pause</label>
              <TimePicker
                style={{ width: 100 }}
                showSecond={true}
                defaultValue={helpers.secondsToMoment(this.state.pause)}
                className="xxx"
                onChange={this.onPauseChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button' onClick={this.submitForm}>
                {submitText}
              </button>
              <button className='ui basic red button' onClick={this.props.closeForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
