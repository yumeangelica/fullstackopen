const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user') //Importataan User model

const app = require('../app') // import express app
const api = supertest(app) // superagent olio joka voi tehdä http pyyntöjä
const helper = require('./test_helper') // import helper funktiot



describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ruusu',
      name: 'Angelica Roselie',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})


//testataan ettei virheellisiä käyttäjiä luoda
describe('no faulty users are created', () => {
  test('creation fails if username is already taken', async () => { //jos käyttäjänimi on jo käytössä

    const newUser = { 
      username: 'root', //käyttäjänimi on jo käytössä
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api //tallennetaan tulos
      .post('/api/users') //post pyyntö
      .send(newUser) //lähetetään uusi käyttäjä
      .expect(400) //odotetaan virheellistä vastausta 400 bad request
      .expect('Content-Type', /application\/json/) //odotetaan json vastausta

    expect(result.body.error).toContain('username must be unique') //odotetaan että virheilmoituksessa on sanat username must be unique
  })

  test('no password under 3 characters is accepted', async () => { //jos salasana on alle 3 merkkiä
      
      const newUser = { //luodaan uusi virheellinen käyttäjä
        username: 'testikissa',
        name: 'kiisu',
        password: 'ki'
      }

      const result = await api
        .post('/api/users')
        .send(newUser) //lähetetään uusi virheellinen käyttäjä
        .expect(400) //odotetaan virheellistä vastausta 400 bad request
        .expect('Content-Type', /application\/json/) //odotetaan json vastausta

      expect(result.body.error).toContain('password must be at least 3 characters long') //odotetaan että virheilmoituksessa on sanat password must be at least 3 characters long

  })



  test('no username under 3 characters is accepted', async () => { //jos käyttäjänimi on alle 3 merkkiä

      const newUser = { //luodaan uusi virheellinen käyttäjä
        username: 'ki',
        name: 'kiisu',
        password: 'kissa'
      }

      const result = await api
        .post('/api/users')
        .send(newUser) //lähetetään uusi virheellinen käyttäjä
        .expect(400) //odotetaan virheellistä vastausta 400 bad request
        .expect('Content-Type', /application\/json/) //odotetaan json vastausta

      expect(result.body.error).toContain('username must be at least 3 characters long') //odotetaan että virheilmoituksessa on sanat username must be at least 3 characters long

  })


})
