import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => { // statistics component
  
  const average = ((good - bad) / (good + neutral + bad)).toFixed(2)
  const positive = ((good / (good + neutral + bad)) * 100).toFixed(2) + ' %'
  const all = good + neutral + bad

  // if there is no feedback given yet show this
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } 

  // if there is feedback given show this
  return (
    <>
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
    </>
  )
}


// button component
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

// StatisticLine komponentti
const StatisticLine = ({text, value}) => {
  
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App