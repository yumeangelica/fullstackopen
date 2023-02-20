import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import Notification from './components/Notification' // importataan Notification komponentti


const App = () => {
    const dispatch = useDispatch() // dispatch funktio
    useEffect(() => { // useEffect hook joka dispatchaa initializeAnecdotes funktion kun komponentti renderöidään
        dispatch(initializeAnecdotes()) // haetaan kaikki anekdoottiobjektit listana initializeAnecdotes funktiolla, ja dispatchataan se
    }, [dispatch]) // useEffect hookin riippuvuudet

  return (
    <>
      <h2>Anecdotes</h2>
        <Notification /> {/* renderöidään Notification komponentti */}
        <Filter />
        <AnecdoteForm />
        <AnecdoteList />
    </>
  )
}

export default App