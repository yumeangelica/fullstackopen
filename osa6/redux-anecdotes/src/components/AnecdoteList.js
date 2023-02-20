import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer' // 6.12 importataan createNewNotification funktio


const AnecdoteList = () => {
  const anecdotes = useSelector(state => { // useSelector hook, joka ottaa state parametrina ja palauttaa sen anecdotes arvon. tekee read-only kopion statesta
    const filteredResult = state.anecdotes.filter(anecdote => { // filteröidään anekdootit filtterin mukaan
        return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      })
    
    return filteredResult.slice().sort((a, b) => b.votes - a.votes) // kopio statesta, joka sortataan äänten mukaan suurimmasta pienimpään
  })

  const dispatch = useDispatch()

  // create action kun vote buttonia painetaan
  const vote = (anecdote) => { // vote funktio dispatchaa actionin, joka lisää yhden äänen staten arvoon. saa parametrina anekdootin objektin
    dispatch(createVote(anecdote)) // createVote action saa parametrina anekdootin, antaa sille tyypin ja sen jälkeen dispatchaa sen 
    dispatch(createNewNotification(`you voted: '${anecdote.content}'`, 5)) // 6.12 dispatchataan createNewNotification funktio
  }

  const Anecdote = ({ anecdote }) => { // luodaan uusi anekdootti komponentti
    return (
      <div style={{marginBottom:"5px"}}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}{' '}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  }

  return (
    <>
      {anecdotes // loopataan kaikki anekdootit ja renderöidään ne
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </>
  )
}

export default AnecdoteList