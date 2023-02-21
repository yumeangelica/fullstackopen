import { useMutation, useQueryClient } from "react-query"
import { addAnecdote } from "../services/requests"

const AnecdoteForm = () => {

    const queryClient = useQueryClient() // tarvitaan, jotta voidaan päivittää dataa

    const newAnecdoteMutation = useMutation(addAnecdote, { // luo mutaation ja sen tilan
        onSuccess: (newAnecdote) => { 
            const oldAnecdotes = queryClient.getQueryData('anecdotes') // haetaan vanhat anekdootit
            queryClient.invalidateQueries('anecdotes', oldAnecdotes.concat(newAnecdote)) // lisätään uusi anekdootti vanhojen joukkoon
        },
        onError: () => {
            setTimeout(() => {

            }, 5000)
        }
    })

    const onCreate = async (event) => {
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
