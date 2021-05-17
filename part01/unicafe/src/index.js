import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.title}</h1>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="GIVE ME YOUR FEEDBACK" />
      <button onClick={() => setGood(good + 1)}>GOOD</button>
      <button onClick={() => setNeutral(neutral + 1)}>NEUTRAL</button>
      <button onClick={() => setBad(bad + 1)}>BAD</button>
      <h1>STATISTICS</h1>
      <br />
      <p>GOOD {good}</p>
      <p>NEUTRAL {neutral}</p>
      <p>BAD {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
