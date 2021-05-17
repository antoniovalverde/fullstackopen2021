import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.tit.name} {props.tit.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part tit={props.parts.parts[0]} />
      <Part tit={props.parts.parts[1]} />
      <Part tit={props.parts.parts[2]} />
    </div>
  )
}

function Total(props) {
  return (
    <p>
      <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
