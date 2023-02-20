import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = (() => { // generoi id:n alkaen luvusta 0
    let id = -1
    return () => {
        id += 1
        return id
    }
})()

const getAll = async () => { // palauttaa kaikki anekdootit serveriltä
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => { // luodaan uusi anekdootti serverille
    const newAnecdoteObject = {
        content: content,
        id: getId(),
        votes: 0
    }

    const response = await axios.post(baseUrl, newAnecdoteObject)
    console.log('response.data from post', response.data)
    return response.data
}

const upVoteAnecdote = async (anecdote) => { // päivitetään anekdoottia serverillä
    const anecdoteToUpVote = await axios.get(`${baseUrl}/${anecdote.id}`) // haetaan anekdootti id:n perusteella
    
    const updatedAnecdote = { // pidetään muut tiedot samana, mutta lisätään ääni
        ...anecdoteToUpVote.data, votes: anecdoteToUpVote.data.votes + 1
    } 

    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote) // päivitetään anekdootti id:n perusteella. korvataan vanha obj uudella
    console.log('response.data from put', response.data)
    return response.data
}

const anecdoteService = { getAll, createNew, upVoteAnecdote }

export default anecdoteService