import React from 'react'

const Header = props =>
  <h1>{props.course.name}</h1>

const Part = props =>
  <p>{props.name} {props.exercises}</p>

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(tema => <Part key={tema.id} name={tema.name} exercises={tema.exercises} />)}  
        </div>
    )
}

const Course = (props) => {  
    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
        </div>
  )
}

export default Course