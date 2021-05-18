import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Boton = (props) => {
  return (
    <button onClick={props.handleClick}> {props.texto} </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [puntos, setPuntos] = useState(new Array(6).fill(0))

  const handleClickNext = () => {
    let num = Math.floor(Math.random() * anecdotes.length);
    setSelected(num);
  };

  const handleClickVote = () => {
    const copy = [...puntos]
    copy[selected] += 1
    setPuntos(copy)
  };

  const MasVotada = () => {
    let indiceMas = 0
    let max = 0
    puntos.forEach((item, indice) => {
      if (item > max) {
        max = item;
        indiceMas = indice
      }
    })
    return indiceMas
  }

  return (
    <div>
      <h3> {props.anecdotes[selected]} </h3>
      <p>has {puntos[selected]} votos</p>
      <Boton handleClick={handleClickNext} texto="NEXT ANECDOTA" />
      <Boton handleClick={handleClickVote} texto="VOTAR" />
      <br />
      <br />
      <h2>Anecdote with most votes</h2>
      <h3> {anecdotes[MasVotada()]} </h3>
      <p>has {puntos[MasVotada()]} votos</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)