import React from 'react';

export default class SaveButton extends React.Component {
  saveToBackend = () => {
    console.log("save to backend", this.props.state)
  }

  render() {
    return (
      <button onClick={this.saveToBackend}>Save to Backend</button>
    )
  }
}
