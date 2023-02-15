const config = require('./utils/config') //tiedosto jossa on portin numero ja tietokannan osoite
const express = require('express') //otetaan express käyttöön
const app = express() //luodaan express-sovellus
require('express-async-errors') //otetaan express-async-errors käyttöön
const cors = require('cors')  //otetaan cors käyttöön
const blogsRouter = require('./controllers/blogs') //otetaan käyttöön blogs router
const usersRouter = require('./controllers/users') //otetaan käyttöön users router

const loginRouter = require('./controllers/login') //otetaan käyttöön login router

const logger = require('./utils/logger') //otetaan logger käyttöön
const mongoose = require('mongoose') //otetaan mongoose käyttöön

const middleware = require('./utils/middleware') //4.20 //otetaan middleware käyttöön


logger.info('connecting to', config.MONGODB_URI) //tulostaa konsoliin tietokannan osoitteen

mongoose.connect(config.MONGODB_URI) //yhteys tietokantaan
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json()) //json parser datan vastaanottamista varten, app vastaanottaa

//4.20
app.use(middleware.tokenExtractor) //käytetään token extractor middlewarea

// //4.22
// app.use(middleware.userExtractor) //käytetään user extractor middlewarea


app.use('/api/blogs', middleware.userExtractor, blogsRouter) //käytetään routeria, käytetään reittiä /api/blogs
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter) //käytetään login routeria, käytetään reittiä /api/login

if (process.env.NODE_ENV === 'test') { //testi router
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app