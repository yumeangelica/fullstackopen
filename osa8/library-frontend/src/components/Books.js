import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries' // 8.9 import the query
import { useQuery } from '@apollo/client' // 8.9 import useQuery functions


const Books = ({ show }) => {

    // 8.9 use the useQuery hook to send the query to the server
    const booksResult = useQuery(ALL_BOOKS, {
        pollInterval: 2000 // 8.10 set the pollInterval to 2 seconds
    })


    const [books, setBooks] = useState(null) // 8.9 add the books state variable
    const [filteredBooks, setFilteredBooks] = useState(null) // 8.19 - filteredBooks state variable
    const [uniqueGenres, setUniqueGenres] = useState(null) // 8.19 - add genres state variable

    useEffect(() => { // 8.9 - create a useEffect hook
        if (booksResult.data) { // 8.9 - if the query has finished loading,
            setBooks(booksResult.data.allBooks) // 8.9 add the books returned by the query to state
        }
    }, [books, booksResult.data]) // 8.9 - add the booksResult.data as a dependency to the useEffect hook


    useEffect(() => { // 8.19 - create a useEffect hook for getting unique genres from books
        if (books) {
            const allGenres = books.flatMap(book => book.genres); // getting all genres from books
            const uniqueGenreList = [...new Set(allGenres)]; // getting unique genres
            setUniqueGenres(uniqueGenreList); // set unique genres to state
        }
    }, [books]);


    const genreSelect = (genre) => { // 8.19 - create a function for selecting a genre
        if (!genre) {
            setFilteredBooks(null); // reset filter when no genre is selected to show all
        } else {
            const filteredBooks = books.filter(book => book.genres.includes(genre)); // filter books by genre
            setFilteredBooks(filteredBooks); // set filtered books to state
        }
    };



    if (!show) { // 8.9 - if the show prop is false,
        return null
    }

    if (booksResult.loading) { // 8.9 - if the query is still loading,
        return <div>loading...</div>
    }


    const booksToDisplay = filteredBooks || books; // 8.19 - Use filteredBooks if it's set, otherwise use all books

    return (
        <>
            <h2>Books</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr> 
                    {/* 8.9 - map the books to a table */}
                    {booksToDisplay.map(book => (
                        <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div> {/* 8.19 - add a button for each genre */}
                {uniqueGenres.map((genre) => (
                    <button key={genre} onClick={() => genreSelect(genre)}>
                        {genre}
                    </button>
                ))}
                <button onClick={() => genreSelect(null)}>Show All</button>
            </div>
        </>
    );
};

export default Books
