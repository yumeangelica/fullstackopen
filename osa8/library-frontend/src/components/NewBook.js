import { useState } from 'react'

import { useMutation } from '@apollo/client' // 8.10 import the gql and useMutation functions

import { ADD_BOOK } from '../queries'



const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addBook] = useMutation(ADD_BOOK) // 8.10 use the useMutation hook to send the mutation to the server

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
    
        console.log('add book...')
    
        // Parse the published value to an integer
        const parsedPublished = parseInt(published, 10);
    
        // Call the addBook mutation here with the parsed integer value
        addBook({ variables: { title, author, published: parsedPublished, genres } })
    
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')

    }
    

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook