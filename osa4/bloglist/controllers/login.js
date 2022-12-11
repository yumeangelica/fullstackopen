const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


//4.18...


loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username }) //etsii pyynnön mukana olevaa usernamea vastaavan käyttäjän tietokannasta.
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash) //tarkistaa, että salasana on oikea. tietokantaan ei ole talletettu salasanaa, vaan salasanasta laskettu hash, tehdään vertailu metodilla bcrypt.compare

  if (!(user && passwordCorrect)) { //jos käyttäjää ei löydy tai salasana on väärä, palautetaan virheilmoitus
    return response.status(401).json({ //401 = unauthorized
      error: 'invalid username or password' //virheilmoitus
    })
  }


  //Jos salasana on oikein, luodaan metodin jwt.sign avulla token, joka sisältää digitaalisesti allekirjoitetussa muodossa käyttäjätunnuksen ja käyttäjän id:

  const userForToken = { //luodaan tokeniin tallennettava objekti
    username: user.username,
    id: user._id,
  }

  //tokenin luominen: process.env.SECRET tulee .env tiedostosta, on salainen ja voi olla mikä tahansa merkkijono
  const token = jwt.sign(userForToken, process.env.SECRET) //luodaan token, joka sisältää käyttäjätunnuksen ja käyttäjän id:n

  response 
    .status(200) //200 = ok
    .send({ token, username: user.username, name: user.name }) //palautetaan token, käyttäjätunnus ja nimi
})

module.exports = loginRouter