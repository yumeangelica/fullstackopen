import { useState } from 'react'



//button komponentti
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const App = () => {
  //lista anekdooteista
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  //sovelluksen tila
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  //äänestys toiminnallisuus, kopioi pisteet taulukkoon ja lisää yhden pisteet valitulle anekdootille
  const voteAnecdote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
    console.log(pointsCopy)
  }

  //satunnainen anekdootti laskee satunnaisen numeron väliltä 0 - listaan kuuluvien anekdoottien määrä ja asettaa sen tilaan
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  //haetaan eniten ääniä saanut anekdootti
  const maxPoints = () => Math.max(...points)



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>


      <Button handleClick={() => voteAnecdote()} text="vote" />
      <Button handleClick={() => randomAnecdote()} text="next anecdote" />


      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[points.indexOf(maxPoints())]}</p>
      <p>has {maxPoints()} votes</p>


    </div >
  )
}

export default App