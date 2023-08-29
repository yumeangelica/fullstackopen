import { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries' // 8,20
import { useQuery } from '@apollo/client' // 8.20 import useQuery functions



const Recommendations = ({ show, token }) => {
    
    // 8.9 use the useQuery hook to send the query to the server
    const booksResult = useQuery(ALL_BOOKS,
        { pollInterval: 2000 }
        )

    const meResult = useQuery(ME,
        { pollInterval: 2000 }
        ) // 8.20 - use the useQuery hook to send the query to the server to get the logged in user
    
    const favouriteGenre = meResult.data?.me?.favouriteGenre // 8.20 - get the favourite genre from the meResult
    
    const [recommendedBooks, setRecommendedBooks] = useState([]) // 8.20 - add the recommendedBooks state variable
    
    useEffect(() => { // create a useEffect hook
        if (booksResult.data && favouriteGenre) { 
            const filteredBooks = booksResult.data.allBooks.filter(book => book.genres.includes(favouriteGenre)) // 8.20 - filter the recommendedBooks by the favourite genre
            setRecommendedBooks(filteredBooks) // 8.20 - set the filteredBooks to state
        }
    }, [booksResult.data, favouriteGenre]) // add the booksResult.data as a dependency to the useEffect hook
    
    
    if (!show) { // if the show prop is false,
        return null
    }

    if (booksResult.loading || meResult.loading) { // if the query is still loading,
        return <div>loading...</div>
    }

    if (token === null) { // if the token is null,
        return <h2>Please log in to see recommendations</h2> // display a message
    }

    return (
        <>
            <h2>Recommendations</h2>

            {favouriteGenre ? ( // Display the favorite genre if available
                <p>Books in your favourite genre: <strong>{favouriteGenre}</strong></p>
            ) : (
                <p>Your favourite genre is not available.</p>
            )}


            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {recommendedBooks.map((book) => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </>
    );
};

export default Recommendations
