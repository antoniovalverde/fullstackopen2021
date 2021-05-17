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
      {props.tit.part} {props.tit.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part tit={props.datos[0]} />
      <Part tit={props.datos[1]} />
      <Part tit={props.datos[2]} />
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

  const partes = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content datos={partes}/>
      <Total total={partes[0].exercises + partes[1].exercises + partes[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
