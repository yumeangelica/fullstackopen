import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => { // haetaan anekdootit
    try {
        const response = await axios.get(baseUrl)
        return response.data

    } catch (error) { // jos kysely epäonnistuu, tulostetaan virhe
        console.log('error: ', error)
        
    }
}


const addAnecdote = async (newAnecdote) => { // lisätään anekdootti
    try {
        const response = await axios.post(baseUrl, newAnecdote)        
        return response.data

    } catch (error) { // jos kysely epäonnistuu, tulostetaan virhe
        console.log('error: ', error)
        
    }
}

const updateAnecdoteVote = async (anecdote) => { // päivitetään anekdootin äänet
    const anecdoteToUpdate = await axios.get(`${baseUrl}/${anecdote.id}`)
    console.log('anecdoteToUpdate: ', anecdoteToUpdate.data)
    const updatedAnecdote = {...anecdoteToUpdate.data, votes: anecdoteToUpdate.data.votes + 1}
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
    console.log('response: ', response.data)
    return response.data
}

export { getAnecdotes, addAnecdote, updateAnecdoteVote }