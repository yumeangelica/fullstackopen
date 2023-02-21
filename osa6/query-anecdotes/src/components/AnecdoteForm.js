import { useMutation, useQueryClient } from "react-query"
import { addAnecdote } from "../services/requests"

import { useNotificationDispatch } from '../NotificationContext' // importataan contextin dispatch funktio

const AnecdoteForm = () => {
    const dispatch = useNotificationDispatch() // luodaan dispatch funktio, jotta voidaan kutsua sitä

    const queryClient = useQueryClient() // tarvitaan, jotta voidaan päivittää dataa

    const newAnecdoteMutation = useMutation(addAnecdote, { // luo mutaation ja sen tilan
        onSuccess: (newAnecdote) => { 
            const oldAnecdotes = queryClient.getQueryData('anecdotes') // haetaan vanhat anekdootit
            queryClient.invalidateQueries('anecdotes', oldAnecdotes.concat(newAnecdote)) // lisätään uusi anekdootti vanhojen joukkoon

            dispatch({ type: 'create', payload: `you created: ${newAnecdote.content}` }) // kutsutaan dispatch funktiota, joka asettaa uuden tilan
            setTimeout(() => { // poistetaan ilmoitus 5 sekunnin kuluttua
                dispatch({ type: 'clear' })
            }, 5000)
        },
        onError: () => { // error tapauksessa
            dispatch({ 
                type: 'create', 
                payload: `too short anecdote, must have length 5 or more`, 
            }) // kutsutaan dispatch funktiota, joka asettaa uuden tilan error tapauksessa

            setTimeout(() => { // poistetaan ilmoitus 5 sekunnin kuluttua
                dispatch({ type: 'clear' })
            }, 5000)
        }
    })

    const onCreate = async (event) => { // luodaan uusi anekdootti
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote', content)
        newAnecdoteMutation.mutate({ content, votes: 0 })
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
