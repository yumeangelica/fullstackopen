require('dotenv').config() //otetaan dotenv käyttöön ennen modelin Blog importtaamista

const PORT = process.env.PORT //otetaan portti .env tiedostosta

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI


  
module.exports = {
  MONGODB_URI,
  PORT
}