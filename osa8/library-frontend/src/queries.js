import { gql } from '@apollo/client'


// 8.8 create a query for all authors
export const ALL_AUTHORS = gql`
    query {
        allAuthors  {
            name
            born
            bookCount
        }
    }
    `



// 8.9 create a query for all books
export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
    `



// 8.10 create a mutation for editing the birthyear of an author
export const EDIT_AUTHOR = gql`
mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
    }
}
`



// 8.10 create a mutation for adding a book
export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }
    `




