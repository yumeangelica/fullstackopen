import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer' // 6.12 importataan createNewNotification funktio

const AnecdoteForm = () => { //luodaan uusi anekdootti komponentti
  const dispatch = useDispatch()

  // käsittelijäfunktio anekdootille, joka saa parametrina tapahtuman
  const handleSubmit = async (event) => {
    
    event.preventDefault()
    
    const content = event.target.anecdotefield.value // luodaan uusi anekdootti objekti joka ottaa fieldin arvon ja generoi id:n ja 0 ääntä oletuksena
    
    event.target.anecdotefield.value = '' // tyhjentää input kentän
    dispatch(createAnecdote(content)) // anekdootti saa tyypin createAnecdote funktiolta, ja sen jälkeen dispatchataan

    dispatch(createNewNotification(`you created: '${content}'`, 5)) // 6.19 dispatchataan createNewNotification funktio. ja saa parametrina uuden anekdootin sisällön ja 5 sekunnin ajan
  }

  return (
    <>
      <h3>Create new</h3>
      <form style={{marginBottom: "20px"}} onSubmit={handleSubmit}> {/* kutsuu handleSubmit funktiota kun on klikattu add buttonia*/}
        <input name='anecdotefield' required/>
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default AnecdoteForm