import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as helpers from './../helpers'
import EditableExercise from './editable_exercise'

export default class EditableExercisesList extends React.Component {
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
                            elapsed={exercise.elapsed}
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
