const logger = require('./logger') //otetaan logger käyttöön
const User = require('../models/user') //otetaan user model käyttöön
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog') //otetaan blog model käyttöön

const requestLogger = (request, response, next) => { //request logger middleware
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => { //unknown endpoint middleware
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => { //error handler middleware
  logger.error(error.message) //tulostaa konsoliin errorin

  if (error.name === 'CastError') { //jos errorin nimi on CastError
    return response.status(400).send({ error: 'malformatted id' }) //tulostaa konsoliin errorin
  } else if (error.name === 'ValidationError') { //jos errorin nimi on ValidationError
    return response.status(400).json({ error: error.message }) //tulostaa konsoliin errorin
  } else if (error.name === 'JsonWebTokenError') { //jos errorin nimi on JsonWebTokenError
    return response.status(401).json({ error: 'invalid token' }) //tulostaa konsoliin errorin
  }

  next(error) //jos ei ole ylläolevia virheitä, niin seuraava middleware
}




//normaali middleware on funktio, jolla on 3 parametria, ja joka kutsuu lopuksi parametrina next olevaa funktiota:
//4.20 tokenExtractor middleware
const tokenExtractor = (request, response, next) => { //token extractor middleware
  const authorization = request.get('authorization') //otetaan authorization headerista token

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { //jos authorization ja authorization.toLowerCase().startsWith('bearer ') on true
    const token = authorization.substring(7)
    request.token = token//request.token on authorization.substring(7)
  } else {
    request.token = null //jos ei ole tokenia, niin request.token on null
  }

  next() //seuraava middleware
}


//4.22 userExtractor middleware
const userExtractor = async (request, response, next) => { //user extractor middleware
  if (!request.token) { //jos ei ole tokenia, palautetaan status 401 = unauthorized
    request.user = null
  } else {
    const decodedToken = jwt.verify(request.token, process.env.SECRET) //dekoodataan token
    if (!decodedToken.id) { //jos decodedTokenin id:tä ei ole, palautetaan status 401 = unauthorized
      request.user = null
    } else {
      request.user = await User.findById(decodedToken.id) //request.user on decodedTokenin id
    }
  }
  
  next() //seuraava middleware
}

// Blog.pre('remove', async (next) => {
//   this.model('id').remove({ blog: this._id }, next) //blog modelin pre-hook, joka poistaa blogista kaikki kommentit
// }) //blog modelin pre-hook, joka poistaa blogista kaikki kommentit


module.exports = { //exportataan middlewaret
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}