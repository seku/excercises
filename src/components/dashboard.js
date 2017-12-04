import React from 'react';
import uuid from 'uuid'
import moment from 'moment';

import * as helpers from './../helpers'
import Timer from './timer'
import AddNewExercise from './add_new_exercise'
import EditableExercisesList from './editable_exercises_list'

export default class Dashboard extends React.Component {
  state = {
    elapsed: 0,
    runningSince: null,
    exercises: [
      {
        title: 'Practice squat',
        id: uuid.v4(),
        duration: moment(new Date(2010, 1, 1, 0, 5, 0)),
        pause: moment(new Date(2010, 1, 1, 0, 2, 0))
      }, {
        title: 'Bake squash',
        id: uuid.v4(),
        duration: moment(new Date(2010, 1, 1, 0, 5, 0)),
        pause: moment(new Date(2010, 1, 1, 0, 2, 0))
      }
    ]
  }
  addNewExercise = (exercise) => {
    const newExercise = {
      title: exercise.title,
      id: uuid.v4(),
      duration: exercise.duration,
      pause: exercise.pause
    }
    this.setState({exercises: this.state.exercises.concat(newExercise)})
  }
  updateExercise = (exercise) => {
    const exercises        = this.state.exercises
    const oldExercise      = exercises.find(e => e.id === exercise.id)
    const index            = exercises.indexOf(oldExercise)
    const updatedExercise  = Object.assign({}, oldExercise, exercise)
    const updatedExercises = [
      ...exercises.slice(0, index),
      updatedExercise,
      ...exercises.slice(index + 1)
    ]
    this.setState({exercises: updatedExercises})
  }
  deleteExercise = (exerciseId) => {
    const newExercises = this.state.exercises.filter(e => e.id !== exerciseId)
    this.setState({exercises: newExercises})
  }
  startTimer = () => {
    const now = Date.now();
    this.setState({runningSince: now});
  };
  stopTimer = () => {
    const now = Date.now();
    const lastElapsed = now - this.state.runningSince;
    this.setState({
      elapsed: this.state.elapsed + lastElapsed,
      runningSince: null
    });
  };
  reorderExersicesList = (result) => {  // dropped outside the list
    if (!result.destination) {
      return;
    }
    const reorderedExercises = helpers.reorder(
      this.state.exercises,
      result.source.index,
      result.destination.index
    );
    this.setState({exercises: reorderedExercises});
  }

  render() {
    return (
      <div className='ui two column centered grid'>
        <div className='row'>
          <div className='column centered'>
            <h1>Exercises</h1>
            <EditableExercisesList
              exercises={this.state.exercises}
              updateExercise={this.updateExercise}
              deleteExercise={this.deleteExercise}
              reorderExersicesList={this.reorderExersicesList}
            />
            <AddNewExercise submitForm={this.addNewExercise}/>
          </div>
          <div className='column centered'>
            <h1>Timer</h1>
            <Timer runningSince={this.state.runningSince} elapsed={this.state.elapsed} startTimer={this.startTimer} stopTimer={this.stopTimer}/>
          </div>
        </div>
      </div>
    );
  }
}
