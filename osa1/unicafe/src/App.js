import { useState } from 'react'


//statistics komponentti
const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  
  // lasketaan keskiarvo
  const average = (props.good - props.bad) / (props.good + props.neutral + props.bad).toFixed(2)
  
  // lasketaan positiivisten osuus
  const positive = ((props.good / (props.good + props.neutral + props.bad)) * 100).toFixed(2) + ' %'

  // lasketaan kaikki palautteet yhteen
  const all = props.good + props.neutral + props.bad

  //jos ei ole palautetta, näytä no feedback given
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }  //jos on palautetta, näytä statistics

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}


// button komponentti
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

// StatisticLine komponentti
const StatisticLine = (props) => {
  const text = props.text
  const value = props.value
  
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}



const App = () => {

  //sovelluksen tila
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>

        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />

        <Statistics good={good} neutral={neutral} bad={bad} />

      </div>

    </div>
  )
}

export default App