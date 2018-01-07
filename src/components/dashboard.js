import React from 'react';
import uuid from 'uuid'
import * as helpers from './../helpers'
import Timer from './timer'
import AddNewExercise from './add_new_exercise'
import EditableExercisesList from './editable_exercises_list'

export default class Dashboard extends React.Component {
  state = {
    totalElapsed: 0, // sec
    isRunning: false,
    exercises: [
      {
        title: 'Practice squat',
        id: uuid.v4(),
        duration: 5, //s
        pause: 2, //s
        elapsed: 0
      }, {
        title: 'Bake squash',
        id: uuid.v4(),
        duration: 5, //s
        pause: 2, //ms
        elapsed: 0
      }
    ]
  }
  addNewExercise = (exercise) => {
    const newExercise = {
      title: exercise.title,
      id: uuid.v4(),
      duration: exercise.duration,
      pause: exercise.pause,
      elapsed: 0
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
    this.forceUpdateInterval = setInterval(() => this.updateBySecond(), 1000);
    this.setState({isRunning: true})
  };
  updateBySecond = () => {
    const totalElapsed      = this.state.totalElapsed + 1
    const exercises         = this.state.exercises
    const exercise          = exercises.find(e =>  {
      console.log("e", e.elapsed)
      return (e.pause + e.duration) > e.elapsed
      // return e.pause > 0
    })
    if (exercise) {
      const index             = exercises.indexOf(exercise)
      const exercieNewElapsed = exercise.elapsed + 1
      const updatedExercise   = Object.assign({}, exercise, {elapsed: exercieNewElapsed})
      const updatedExercises  = [
        ...exercises.slice(0, index),
        updatedExercise,
        ...exercises.slice(index + 1)
      ]
      this.setState({totalElapsed: totalElapsed, exercises: updatedExercises});
    } else {
      alert("finitio")
      this.stopTimer()
    }
  };
  pauseTimer = () => {
    clearInterval(this.forceUpdateInterval);
    this.setState({isRunning: false})
  };
  stopTimer = () => {
    clearInterval(this.forceUpdateInterval);
    const updatedExercises = this.state.exercises.map(excercise => {
      excercise.elapsed = 0
      return excercise
    })
    // why setState({excercises: updatedExercises}) is not neccessary ??
    this.setState({isRunning: false, totalElapsed: 0, excercises: updatedExercises})
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
            <Timer isRunning={this.state.isRunning} totalElapsed={this.state.totalElapsed} startTimer={this.startTimer} pauseTimer={this.pauseTimer} stopTimer={this.stopTimer}/>
          </div>
        </div>
      </div>
    );
  }
}
