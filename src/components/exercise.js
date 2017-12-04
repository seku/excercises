import React from 'react';

export default class Exercise extends React.Component {
  format = (attr) => {
    return attr.format('HH:mm:ss')
  }
  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='header'>
            Duration: {this.format(this.props.duration)}
          </div>
          <div className='header'>
            Pause: {this.format(this.props.pause)}
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
