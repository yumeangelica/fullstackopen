import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'



const client = new ApolloClient({ // 8.8 create a new ApolloClient instance
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
})


// // 8.8, 8.9 create a query
// const query = gql`
//     query {
//         allAuthors  {
//             name
//             born
//             bookCount
//         }

//         allBooks { 
//             title
//             author
//             published
//         }

//     }
//     `

// // 8.8 send the query to the server
// client.query({ query })
//     .then((result) => console.log(result.data)) // 8.8 log the result to the console



ReactDOM.createRoot(document.getElementById('root')).render(
    // 8.8 wrap the App component in an ApolloProvider component and pass the client to it
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)