import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.title}</h1>
  )
}

const Statistics = (props) => {

  let total = props.bueno + props.neutro + props.malo

  if(total === 0 && props.marca === true){
    return (
      <tr><td><strong>NO FEEDBACK GIVEN</strong></td></tr>
    )
  }

  if(total === 0){
    return (
      <tr><td></td></tr>
    )
  }

  if(props.tipo === 'infoB'){
    return (
      <tr><td>GOOD </td><td>{props.bueno}</td></tr>
    )
  }

  if(props.tipo === 'infoN'){
    return (
      <tr><td>NEUTRAL </td><td>{props.neutro}</td></tr>
    )
  }

  if(props.tipo === 'infoM'){
    return (
      <tr><td>BAD </td><td>{props.malo}</td></tr>
    )
  }

  if(props.tipo === 'all'){
    return (
      <tr><td>ALL </td><td>{total}</td></tr>
    )
  }

  if(props.tipo === 'average'){
    return (
      <tr><td>AVERAGE </td><td>{(props.bueno - props.malo)/(total)}</td></tr>
    )
  }

  return (
    <tr><td>POSITIVE </td><td>{(props.bueno/(total)) * 100} %</td></tr>
  )
}

const Boton = (props) => {
  return (
    <button onClick={props.handleClick}>{props.texto}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBuenoClick = () => {
    setGood(good + 1)
  }

  const handleNeutroClick = () => {
    setNeutral(neutral + 1)
  }

  const handleMaloClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title="GIVE ME YOUR FEEDBACK" />
      <Boton handleClick={handleBuenoClick} texto="GOOD" />
      <Boton handleClick={handleNeutroClick} texto="NEUTRAL" />
      <Boton handleClick={handleMaloClick} texto="BAD" />
      <h1>STATISTICS</h1>
      <br />
      <table>
        <tbody>
          <Statistics bueno={good} neutro={neutral} malo={bad} tipo="infoB" marca={true} />
          <Statistics bueno={good} neutro={neutral} malo={bad} tipo="infoN" />
          <Statistics bueno={good} neutro={neutral} malo={bad} tipo="infoM" />
          <Statistics bueno={good} neutro={neutral} malo={bad} tipo="all" />
          <Statistics bueno={good} neutro={neutral} malo={bad} tipo="average" />
          <Statistics bueno={good} neutro={neutral} malo={bad} tipo="positive" />
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
