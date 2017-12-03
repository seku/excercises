// version uses react-beautiful-dnd
// issue -> input not editable

import React from 'react';
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid'
import moment from 'moment';

import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker';

import * as helpers from './helpers'

class Dashboard extends React.Component {
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
            <ToggleableExerciseForm submitForm={this.addNewExercise}/>
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

class ToggleableExerciseForm extends React.Component {
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

class EditableExercisesList extends React.Component {
  submitForm = (exercise) => {
    this.props.updateExercise(exercise)
  }
  onDragEnd = (result) => {
    this.props.reorderExersicesList(result)
  }
  render() {
    return (
      <div
        id='exercises'
        style={helpers.getExercisesListStyle()}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={helpers.getListStyle(snapshot.isDraggingOver)}
              >
                {this.props.exercises.map(exercise => (
                  <Draggable key={exercise.id} draggableId={exercise.id}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={helpers.getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                        >
                          <EditableExercise
                            id={exercise.id}
                            key={exercise.id}
                            title={exercise.title}
                            duration={exercise.duration}
                            pause={exercise.pause}
                            submitForm={this.submitForm}
                            deleteExercise={this.props.deleteExercise}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

class EditableExercise extends React.Component {
  state = {
    editFormOpen: false
  }
  toggleEditFormOpen = () => {
    let editFormOpen = !this.state.editFormOpen
    this.setState({editFormOpen: editFormOpen})
  }
  submitForm = (exercise) => {
    console.log("here")
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

class Exercise extends React.Component {
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

class ExerciseForm extends React.Component {
  state = {
    id: this.props.id,
    title: this.props.title || 'sex',
    duration: this.props.duration || moment(new Date(2010, 1, 1, 0, 5, 0)),
    pause: this.props.pause || moment(new Date(2010, 1, 1, 0, 2, 0))
  }
  handleChange = (e) => {
    console.log("is change", e.target.name)
    this.setState({[e.target.name]: e.target.value})
  }
  submitForm = () => {
    this.props.submitForm(this.state)
  }
  onDurationChange = (value) => {
    console.log("duration change")
    this.setState({duration: value})
  }
  onPauseChange = (value) => {
    this.setState({pause: value})
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
                defaultValue={this.state.duration}
                className="xxx"
                onChange={this.onDurationChange}
              />
            </div>
            <div className='field'>
              <label>Pause</label>
              <TimePicker
                style={{ width: 100 }}
                showSecond={true}
                defaultValue={this.state.pause}
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

class Timer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }
  toggleRunning = () => {
    if (!!this.props.runningSince) {
      this.props.stopTimer()
    } else {
      this.props.startTimer()
    }
  }
  render() {
    const elapsedString = helpers.renderElapsedString(
      this.props.elapsed, this.props.runningSince
    )
    const actionText = !!this.props.runningSince ? 'Stop' : 'Start'
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
        </div>
        <div className='ui bottom attached blue basic button' onClick={this.toggleRunning}>
          {actionText}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Dashboard />,
  document.getElementById('content')
);
