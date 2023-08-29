require('dotenv').config() // 8.13 dotenv for environment variables


const { WebSocketServer } = require('ws') // 8.23
const { useServer } = require('graphql-ws/lib/use/ws') // 8.23
const { expressMiddleware } = require('@apollo/server/express4') // 8.23
const http = require('http') // 8.23 - http for GraphQL server
const express = require('express') // 8.23 - express for GraphQL server
const cors = require('cors') // 8.23 - cors for GraphQL server

const jwt = require('jsonwebtoken') // 8.16 - jsonwebtoken for authentication

const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema') // 8.23 - @graphql-tools/schema for GraphQL server
const { GraphQLError } = require('graphql') // graphql for GraphQL server

const { AuthenticationError, gql } = require('apollo-server-express')

const { PubSub } = require('graphql-subscriptions') // 8.23 - graphql-subscriptions for GraphQL server
const pubsub = new PubSub() // 8.23 - pubsub for GraphQL server



const mongoose = require('mongoose') // 8.13 - mongoose for MongoDB

const Author = require('./models/Author') // 8.13 - Author model
const Book = require('./models/Book')  // 8.13 - Book model
const User = require('./models/User') // 8.16 - User model

const MONGODB_URI = process.env.MONGODB_URI // 8.13 - MongoDB URI from environment variables
const JWT_SECRET = process.env.JWT_SECRET


// 8.13 - connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => { // 8.13 - error handling
        console.log('Error in connection to MongoDB:', error.message)
    })


// schema for GraphQL
// 8.13, 8.16 - type definitions
const typeDefs = gql`
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: [String]!
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
        id: ID!
	}
	type User {
		username: String!
		favouriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}
	type Mutation {
		addBook(
			title: String!
            author: String!
			published: Int!
			genres: [String!]!
		): Book!
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
	type Subscription {
		bookAdded: Book!
	}
`


// Resolvers for GraphQL server
const resolvers = {
    Query: {
        bookCount: async () => await Book.collection.countDocuments(), /// 8.13 - return the number of books from MongoDB
        authorCount: async () => await Author.collection.countDocuments(), // 8.13 - return the number of authors from MongoDB
        allAuthors: async () => await Author.find({}), // 8.14 - return all authors from MongoDB
        me: (root, args, context) => { // 8.16 - return the current user that is logged in
            return context.currentUser
        },
        allBooks: async (root, args) => { // 8.14 - return all books from MongoDB
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({
                    $and: [
                        { author: { $in: author.id } },
                        { genres: { $in: args.genre } },
                    ],
                }).populate('author')
            }

            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({ author: { $in: author.id } }).populate('author')
            }

            if (args.genre) {
                return Book.find({ genres: { $in: args.genre } }).populate('author')
            }

            return Book.find({}).populate('author')
        },
    },
    Mutation: { // 8.6, 8.14, 8.16 - addBook, editAuthor, createUser, login mutations
        addBook: async (root, args, context) => {

            const currentUser = context.currentUser // 8.16 - current user from context for authentication
            let newBook = null

            if (!currentUser) { // 8.16 - authentication checking, if there is no current user logged in, throw an error
                throw new AuthenticationError('user is not authenticated')
            }

            try { // 8.14 - add a book
                let author = await Author.findOne({ name: args.author }) // check if author exists

                if (!author) { // if author does not exist, create a new author
                    author = new Author({ name: args.author })
                }

                newBook = new Book({ ...args, author: author }) // create a new book with the author
                await newBook.save() // save the new book to MongoDB

                author.bookCount = author.bookCount.concat(newBook.id) // add the book to the author's bookCount
                await author.save() // save the author to MongoDB
            }
            catch (err) { // error handling
                throw new GraphQLError('ADDING BOOK FAILED', { // 8.15 - error handling, graphQL error
                    extensions: {
                        invalidArgs: args,
                        error: err.message
                    },
                })
            }

            pubsub.publish('BOOK_ADDED', {
                bookAdded: newBook
            }) // 8.23 - publish a subscription for adding a book

            return newBook
        },
        editAuthor: async (root, args, context) => { // 8.7 edits the author's birth year
            const currentUser = context.currentUser // 8.16 - current user from context for authentication

            if (!currentUser) { // 8.16 - authentication checking, if there is no current user logged in, throw an error
                throw new AuthenticationError('user is not authenticated')
            }

            try { // edit author's birth year
                await Author.findOneAndUpdate(
                    { name: args.name },
                    {
                        born: args.setBornTo,
                    }
                )
                return await Author.findOne({ name: args.name }) // return the edited author
            }
            catch (err) { // error handling
                throw new GraphQLError('EDIT AUTHOR BIRTHDAY FAILED', { // 8.15 - error handling, graphQL error
                    extensions: {
                        invalidArgs: args,
                        error: err.message
                    },
                })
            }
        },
        createUser: async (root, args) => { // 8.16 - create a new user
            try {
                const newUser = new User({
                    username: args.username,
                    favouriteGenre: args.favoriteGenre,
                })
                return newUser.save()
            }
            catch (err) { // error handling
                throw new GraphQLError('CREATE USER FAILED', { // 8.15 - error handling, graphQL error
                    extensions: {
                        invalidArgs: args,
                        error: err.message
                    },
                })
            }
        },
        login: async (root, args) => { // 8.16 - logs in a user with a username and password, returns a token
            const loginUser = await User.findOne({ username: args.username })

            if (!loginUser || args.password !== 'secret') { // 8.16 - authentication, if there is no user or the password is wrong
                throw new GraphQLError('wrong login credentials')
            }


            return {
                value: jwt.sign(
                    { // 8.16 - user object for authentication
                        username: loginUser.username,
                        id: loginUser._id,
                    },
                    JWT_SECRET)
            } // 8.16 - return a token
        },
    },
    Subscription: { // 8.23 - subscription for adding a book
        bookAdded:
        {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}



const startServer = async () => { // 8.23 - start the GraphQL server function
    const app = express() // 8.23 - express for GraphQL server
    const httpServer = http.createServer(app) // 8.23 - http for GraphQL server

    const wsServer = new WebSocketServer({  // 8.23 - websocket
        server: httpServer,
        path: '/',
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers }) // 8.23
    const serverCleanup = useServer({ schema }, wsServer) // 8.23

    const server = new ApolloServer({ // 8.23 - apollo-server-express for GraphQL server
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    })

    await server.start() // 8.23 - starting the server with async/await

    app.use( // 8.23 - using express for GraphQL server
        '/',
        cors(), // using cors for GraphQL server
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => { // 8.16 - context for authentication
                const auth = req ? req.headers.authorization : null
                if (auth && auth.startsWith('Bearer ')) { // 8.16 - authentication checking
                    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) // 8.16 - decode the token
                    const currentUser = await User.findById(decodedToken.id) // 8.16 - find the current user
                    return { currentUser } // 8.16 - return the current user
                }
            },
        }),
    )

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

startServer()