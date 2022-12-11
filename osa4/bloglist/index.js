const app = require('./app.js') // Express-sovellus, kaikki tapahtuu app.js:ssä
const http = require('http') // Node.js:n http-palvelin
const config = require('./utils/config.js') // Portin ja tietokannan osoite

const logger = require('./utils/logger.js') // Loggaamisen moduuli

const server = http.createServer(app) // Luodaan HTTP-palvelin, joka käyttää Express-sovellusta

server.listen(config.PORT, () => { //kuuntelee porttia, portin numero tulee config.js:stä
  logger.info(`Server running on port ${config.PORT}`) //tulostaa konsoliin portin numeron loggerin avulla
})