import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [], // alkutilan lista
    reducers: { // reducerit, käsittelee yhden anekdootin kerrallaan
        pushAnecdote: (state, action) => { // pushataan yksi anekdootti kerrallaan staten listaan
            state.push(action.payload)
        },
        voteAnecdote: (state, action) => {
            const id = action.payload.id
            const anecdoteToChange = state.find(n => n.id === id) // etsii anekdootin id:n perusteella kaikista anekdooteista ja katsoo että id matchaa
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1 // lisätään ääni
            }

            // palauttaa staten jossa on muutettu anekdootti ja sorttaa anekdootit äänien määrän mukaan, jos id matchaa. jos ei niin palauttaa alkuperäisen staten
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote) // 6.5
        },
        setAnecdotes: (state, action) => { // laitetaan kaikki anekdootit staten listaan
            return action.payload // palauttaa staten jossa on lisätty uusi anekdootti, data on actionin data
        }
    },
})


const initializeAnecdotes = () => {
    return async dispatch => { // palauttaa dispatch funktion, joka palauttaa funktion. on referenssi dispatch funktioon, invoketaan muualla
        const anecdotes = await anecdoteService.getAll() // haetaan kaikki anekdootti objektit asynccina servicen avulla
        dispatch(setAnecdotes(anecdotes)) // dispatchataan setAnecdotes action, joka palauttaa staten jossa on kaikki anekdootit
    }
    
}

// 6.6 - creator funktio, joka palauttaa actionin
const createAnecdote = (anecdote) => { //ottaa vastaan anekdootin objektin, mikä sisältää conentin ja votes

    return async dispatch => { // palauttaa dispatch funktion, joka palauttaa funktion. on referenssi dispatch funktioon, invoketaan muualla
        const newAnecdote = await anecdoteService.createNew(anecdote) // luodaan uusi anekdootti servicen avulla
        dispatch(pushAnecdote(newAnecdote)) // dispatchataan pushAnecdote action, joka palauttaa staten jossa on lisätty uusi anekdootti, data on actionin data
    }
}

const createVote = (anecdote) => { //tapahtuu vote buttonin painalluksen jälkeen

    return async dispatch => {
        const updatedAnecdote = await anecdoteService.upVoteAnecdote(anecdote) // päivitetään anekdootti servicen avulla
        dispatch(voteAnecdote(updatedAnecdote)) // dispatchataan voteAnecdote action, joka palauttaa staten jossa on muutettu anekdootti, data on actionin data
    }
}


export const { pushAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions // nämä on reducerin funktioita
export { initializeAnecdotes, createAnecdote, createVote } // nämä on action creator funktioita
export default anecdoteSlice.reducer