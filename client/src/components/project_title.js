import React from 'react';


// 1.
// const ProjectTitle = function(props) {
//   return(
//     <div><h1>{props.title}</h1></div>
//   )
// }
// export default ProjectTitle

// 2.
export default function(props) {
  return(
    <div><h1>{props.title}</h1></div>
  )
}

// 3.
// export default class ProjectTitle extends React.Component {
//   render() {
//     return (
//       <div><h1>{this.props.title}</h1></div>
//     )
//   }
// }
