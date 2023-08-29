import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client' // 8.18, 8.24


import { setContext } from 'apollo-link-context' // 8.18 - import the setContext function

import { getMainDefinition } from '@apollo/client/utilities' // 8.24 - import the getMainDefinition function for subscriptions
import { GraphQLWsLink } from '@apollo/client/link/subscriptions' // 8.24
import { createClient } from 'graphql-ws' // 8.24


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token') // 8.18 get the token from local storage
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000',
  })) // 8.24 - create a new GraphQLWsLink instance

const splitLink = split( // 8.24 - create a splitLink
    ({ query }) => {
        const definition = getMainDefinition(query) // 8.24 - get the definition from the query
        return (
            definition.kind === 'OperationDefinition' && // 8.24 - check if the definition is an operation definition
            definition.operation === 'subscription' // 8.24 - check if the operation is a subscription
        )
    },
    wsLink, // 8.24 - if the operation is a subscription, use the wsLink
    authLink.concat(httpLink) // 8.24 - if the operation is not a subscription, use the authLink and httpLink
)



const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink // 8.24 - use the splitLink
})



// 8.8, 8.9 create a query for console logging
// const query = gql`
//     query {
//         allAuthors  {
//             name
//             born
//         }

//         allBooks { 
//             title
//             published
//             author {
//                 name
//             }
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