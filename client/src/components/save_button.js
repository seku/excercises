import React from 'react';

export default class SaveButton extends React.Component {
  saveToBackend = () => {
    fetch('/api/exercises', {
      method: 'post',
      body: JSON.stringify(this.props.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then( (response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <button onClick={this.saveToBackend}>Save to Backend</button>
    )
  }
}
