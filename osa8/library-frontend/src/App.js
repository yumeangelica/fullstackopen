import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS, ALL_BOOKS } from './queries' // 8.8 import the queries


import { useQuery } from '@apollo/client' // 8.8 import the gql and useQuery functions




const App = () => {
    const [page, setPage] = useState('authors')


    const authorsResult = useQuery(ALL_AUTHORS, {
            pollInterval: 2000 // 8.10 set the pollInterval to 2 seconds
    }
        ) // 8.8 use the useQuery hook to send the query to the server

    const booksResult = useQuery(ALL_BOOKS, {
            pollInterval: 2000 // 8.10 set the pollInterval to 2 seconds
    }) // 8.9 use the useQuery hook to send the query to the server





    return (
        <>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors show={page === 'authors'} authorsResult={authorsResult} /> {/* 8.8 pass the result of the query to the Authors component */}

            <Books show={page === 'books'} booksResult={booksResult} /> {/* 8.9 pass the result of the query to the Books component */}

            <NewBook show={page === 'add'} />


        </>
    )
}

export default App
