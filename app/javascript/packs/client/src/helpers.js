import moment from 'moment';

export function renderElapsedString(elapsed, runningSince) {
  let totalElapsed = elapsed;
  if (runningSince) {
    totalElapsed += Date.now() - runningSince;
  }
  return millisecondsToHuman(totalElapsed);
}
export function formattedSecondsToMoment(seconds) {
  return moment("2015-01-01").startOf('day').seconds(seconds).format('HH:mm:ss')
}

export function secondsToMoment(s) {
  const seconds = Math.floor(s % 60);
  const minutes = Math.floor((s / 60) % 60);
  const hours = Math.floor(s / 60 / 60);
  const date  = new Date(2010, 1, 1, hours, minutes, seconds)
  return moment(date)
}

export function momentToSeconds(value) {
  return moment.duration(value.format("HH:mm:ss")).asSeconds()
}

export function secondsToHuman(s) {
  const seconds = Math.floor(s % 60);
  const minutes = Math.floor((s / 60) % 60);
  const hours = Math.floor(s / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
}

export function millisecondsToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
}

export function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}

// a little function to help us with reordering the result
export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

// using some little inline style helpers to make the app look okay
export function getItemStyle(draggableStyle, isDragging) {
  const styles = {
    // some basic styles to make the items look a bit nicer
    // userSelect: 'none',
    // padding: grid * 2,
    // marginBottom: grid,
    //
    // // change background colour if dragging
    // background: isDragging ? '#cdd1aa' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  }
  return styles;
}
export function getListStyle(isDraggingOver) {
  // const styles = {
  //   background: isDraggingOver ? '#cdd1aa' : 'lightgrey',
  // }
  // return styles;
}

export function getExercisesListStyle() {
  // const styles = {
  //   paddingLeft: '25%',
  //   paddingRight: '25%'
  // }
  const styles = {}
  return styles
}
