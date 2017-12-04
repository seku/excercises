import React from 'react';
import ExerciseForm from './exercise_form'

export default class AddNewExercise extends React.Component {
  state = {
    isOpen: false
  }
  toggleFormOpen = () => {
    let isOpen = !this.state.isOpen
    this.setState({ isOpen: isOpen });
  }
  submitForm = (exercise) => {
    this.props.submitForm(exercise)
    this.toggleFormOpen()
  }
  render() {
    if (this.state.isOpen) {
      return (
        <ExerciseForm closeForm={this.toggleFormOpen} submitForm={this.submitForm}/>
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon' onClick={this.toggleFormOpen}>
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}
