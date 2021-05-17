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
      <p><strong>NO FEEDBACK GIVEN</strong></p>
    )
  }

  if(total === 0){
    return (
      <p></p>
    )
  }

  if(props.tipo === 'infoB'){
    return (
      <p>GOOD {props.bueno}</p>
    )
  }

  if(props.tipo === 'infoN'){
    return (
      <p>NEUTRAL {props.neutro}</p>
    )
  }

  if(props.tipo === 'infoM'){
    return (
      <p>BAD {props.malo}</p>
    )
  }

  if(props.tipo === 'all'){
    return (
      <p>ALL {total}</p>
    )
  }

  if(props.tipo === 'average'){
    return (
      <p>AVERAGE {(props.bueno - props.malo)/(total)}</p>
    )
  }

  return (
        <p>POSITIVE {(props.bueno/(total)) * 100} %</p>
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
      <Statistics bueno={good} neutro={neutral} malo={bad} tipo="infoB" marca={true} />
      <Statistics bueno={good} neutro={neutral} malo={bad} tipo="infoN" />
      <Statistics bueno={good} neutro={neutral} malo={bad} tipo="infoM" />
      <Statistics bueno={good} neutro={neutral} malo={bad} tipo="all" />
      <Statistics bueno={good} neutro={neutral} malo={bad} tipo="average" />
      <Statistics bueno={good} neutro={neutral} malo={bad} tipo="positive" />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
