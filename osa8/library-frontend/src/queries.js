import { gql } from '@apollo/client'


// 8.24 - fragment for the book details
export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
            born
            bookCount
        }
        genres
    }
`



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



// 8.9, 8.24 create a query for all books
export const ALL_BOOKS =
    gql`
	query allBooks($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
		...BookDetails
		}
	}
	${BOOK_DETAILS}
`


// 8.10, 8.18 create a mutation for editing the birthyear of an author
export const EDIT_AUTHOR =
    gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
    }
}
`


// 8.10, 8.18, 8.24 create a mutation for adding a book
export const ADD_BOOK =
    gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

// 8.24 - book added subscription
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`




// 8.18 create mutation for logging in
export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`


// 8.20 create a query for logged in user
export const ME = gql`
    query me {
        me {
            username
            favouriteGenre
        }
    }
`




