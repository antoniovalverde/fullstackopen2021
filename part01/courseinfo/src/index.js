import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
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
      <Part tit={props.p1} />
      <Part tit={props.p2} />
      <Part tit={props.p3} />
    </div>
  )
}

function Total(props) {
  return (
    <p>
      <p>Number of exercises {props.total}</p>
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} p2={part2} p3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
