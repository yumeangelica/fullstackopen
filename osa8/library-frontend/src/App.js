import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm' // 8.16 - import the LoginForm component
import Recommendations from './components/Recommendations' // 8.21 - import the Recommendations component
import { useApolloClient, useSubscription } from '@apollo/client' // 8.18 import the useApolloClient hook
import { BOOK_ADDED } from './queries.js' // 8.24 import the BOOK_ADDED subscription

const App = () => {
    const [page, setPage] = useState('login')

    const [token, setToken] = useState(null) // 8.18 - token state variable

    const client = useApolloClient() // 8.18 - use the useApolloClient hook to access the client

    const logout = () => { // 8.18 - create a logout function
        setToken(null) // 8.18 - set the token state variable to null
        localStorage.clear() // 8.18 - clear the token from local storage
        client.resetStore() // 8.18 - reset the Apollo cache
        setPage('login')
    }

    useSubscription(BOOK_ADDED, { // 8.24 - use the useSubscription hook to subscribe to the BOOK_ADDED subscription
        onData: async ({ data }) => { // 8.24 - when the subscription data is received,
            console.log('data', data)
            window.alert(`New book added! `) // 8.24 - display an alert with the title of the book
        }
    })


    if (token !== null) { // 8.18 - checking if the token is not null, for console logging
        console.log('token', token)
    }

    return (
        <>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('recommendations')}>recommendations</button> {/* 8.21 add a button for the recommendations page */}
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('login')}>login</button> {/* 8.18 add a button for the login page */}
                <button onClick={logout}>logout</button> {/* add a button for the logout function */}
            </div>

            <Authors show={page === 'authors'} /> {/* 8.8 pass the result of the query to the Authors component */}

            <Books show={page === 'books'} /> {/* 8.9 pass the result of the query to the Books component */}

            <Recommendations show={page === 'recommendations'} token={token}/>  {/* add the Recommendations component */}
            
            <NewBook show={page === 'add'} />

            <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} /> {/* 8.18 pass the setToken function to the LoginForm component */}

        </>
    )
}

export default App
