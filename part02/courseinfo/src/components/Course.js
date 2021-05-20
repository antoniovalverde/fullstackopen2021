import React from 'react'

const Header = props =>
  <h3>{props.course.name}</h3>

const Part = props =>
  <p>{props.name} {props.exercises}</p>

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(tema => <Part key={tema.id} name={tema.name} exercises={tema.exercises} />)}  
        </div>
    )
}

const Total = (props) => {

  const total = props.course.parts.reduce((s, parte) => {
    return s + parte.exercises
  }, 0)

  return (
      <div>
          <p><strong>TOTAL OF {total} EXERCISES</strong></p> 
      </div>
  )
}

const Course = (props) => {  
    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
  )
}

export default Course