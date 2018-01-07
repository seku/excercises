import React from 'react';
import ExerciseForm from './exercise_form'
import Exercise from './exercise'

export default class EditableExercise extends React.Component {
  state = {
    editFormOpen: false
  }
  toggleEditFormOpen = () => {
    let editFormOpen = !this.state.editFormOpen
    this.setState({editFormOpen: editFormOpen})
  }
  submitForm = (exercise) => {
    this.props.submitForm(exercise)
    this.toggleEditFormOpen()
  }
  deleteExercise = () => {
    this.props.deleteExercise(this.props.id)
  }
  render() {
    if (this.state.editFormOpen) {
      return (
        <ExerciseForm
          id={this.props.id}
          title={this.props.title}
          duration={this.props.duration}
          pause={this.props.pause}
          submitForm={this.submitForm}
          closeForm={this.toggleEditFormOpen}
        />
      );
    } else {
      return (
        <Exercise
          id={this.props.id}
          title={this.props.title}
          duration={this.props.duration}
          pause={this.props.pause}
          displayEdit={this.toggleEditFormOpen}
          deleteExercise={this.deleteExercise}
        />
      );
    }
  }
}
