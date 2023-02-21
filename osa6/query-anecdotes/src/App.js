import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, updateAnecdoteVote } from './services/requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { useNotificationDispatch } from './NotificationContext' // importataan contextin dispatch funktio


const App = () => {
    const dispatch = useNotificationDispatch() // luodaan dispatch funktio, jotta voidaan kutsua sitä

    const queryClient = useQueryClient() // luodaan queryClient, jotta voidaan päivittää dataa

    // päivitetään anekdootin äänet
    const updateAnecdoteVoteMutation = useMutation(updateAnecdoteVote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    // päivitetään anekdootin äänet
    const handleVote = async (anecdote) => {
        updateAnecdoteVoteMutation.mutate(anecdote)

        dispatch({ type: 'create', payload: `you voted: ${anecdote.content}` })
		setTimeout(() => { // poistetaan ilmoitus 5 sekunnin kuluttua
			dispatch({ type: 'clear' })
		}, 5000)
    }

    // paluuarvo on olio, joka kertoo kyselyn tilan. pilkotaan olio eri muuttujiin
    const { isLoading, isError, data, error } = useQuery('anecdotes', getAnecdotes, {
        refetchOnWindowFocus: false, // ei päivitä dataa, jos ikkuna ei ole aktiivinen
        retry: 1 // yritetään kysely uudelleen, jos se epäonnistuu
    })


    if (isLoading) { // kun dataa ladataaan
        return <div>loading data...</div>
    }

    if (isError) { // error tapaukset
        return <div>error: {error.message}</div>
    }

    if (data === undefined) { // jos ei saada dataa niin näytetään virheilmoitus
        return <div>anecdote service not available to problems in server</div>
    }
   

    const anecdotes = data // haetaan anekdootit, ne on suoraan data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App