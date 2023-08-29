import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries' // 8.11 - 8.12 import the mutation

import { useQuery } from '@apollo/client' // 8.8 import the gql and useQuery functions

const Authors = ({ show }) => { // 8.8 add the authorsResult prop to the Authors component

    // 8.8 use the useQuery hook to send the query to the server   
    const authorsResult = useQuery(ALL_AUTHORS, {
        pollInterval: 2000 // 8.10 set the pollInterval to 2 seconds
    }) 
    // console.log(authorsResult)

    const [name, setName] = useState('') // 8.11 - 8.12 add the name state variable
    const [birthYear, setBirthYear] = useState('')


    const [editAuthor] = useMutation(EDIT_AUTHOR,
        { refetchQueries: [{ query: authorsResult }] }
    ) // 8.11 - 8.12 create a mutation for editing the birthyear of an author

    const handleSubmit = async (event) => { // 8.11 - 8.12 create a function for handling the form submit
        event.preventDefault() // 8.11 - 8.12 prevent the default action of the form

        await editAuthor({ variables: { name: name.value, setBornTo: birthYear } }) // 8.11 - 8.12 call the editAuthor mutation here with the parsed integer value

        setName('') // 8.11 - 8.12 reset the name state variable
        setBirthYear('') // 8.11 - 8.12 reset the born state variable
    }



    if (!show) { // 8.8 if the show prop is false,
        return null
    }

    const authors = [] // 8.8 create an empty array for the authors

    if (authorsResult.loading) { // 8.8 if the query is still loading,
        return <div>loading...</div>
    }

    if (authorsResult.data) { // 8.8 if the query has finished loading,
        authors.push(...authorsResult.data.allAuthors) // 8.8 add the authors returned by the query to the array
    }


    return (
        <>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>book count</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <h2>Set birthyear</h2> {/* 8.11 - 8.12 add a form for setting the birthyear of an author */}
            <form onSubmit={handleSubmit}>
                <div> {/* 8.11 - 8.12 add a select element for selecting the author */}
                    name
                    <Select
                        value={name}
                        onChange={setName}
                        options={authors.map(a => ({ value: a.name, label: a.name }))}
                    />

                </div>

                <div> {/* 8.11 - 8.12 add an input element for entering the birthyear */}
                    born
                    <input type='number' value={birthYear} onChange={({ target }) => setBirthYear(parseInt(target.value))} /> {/* 8.11 - 8.12 add an input element for entering the birthyear and parse the value to an integer */}
                </div>

                <button type='submit'>update author</button>
            </form>


        </>

    )
}


export default Authors
