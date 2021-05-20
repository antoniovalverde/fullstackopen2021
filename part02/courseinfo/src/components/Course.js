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

const Total = (props) => {

  let partes = props.course.parts
  let suma = 0

  for (let i=0;i<partes.length;i++){
    suma += partes[i].exercises
  }

  return (
      <div>
          <p><strong>TOTAL OF {suma} EXERCISES</strong></p> 
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