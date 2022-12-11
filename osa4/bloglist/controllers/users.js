const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (request, response) => { //async funktio joka palauttaa kaikki käyttäjät
    const users = await User.find({}).populate('blogs', {})
    
    // // 4.17 // Populaten parametri määrittelee, että user-dokumenttien notes-kentässä olevat note-olioihin viittaavat id:t korvataan niitä vastaavilla dokumenteilla. näytetään vain title, author ja url
    response.json(users)

})


usersRouter.post('/', async (request, response) => { //async funktio joka lisää käyttäjän
    const { username, name, password } = request.body

    //4.15- 4.16
    //errorit

    //jos käyttäjänimi ei ole uniikki
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique' //jos käyttäjänimi on jo käytössä, palautetaan status code 400 = bad request ja error
        })
    }

    //jos salasana on alle 3 merkkiä
    if (password.length < 3 || password === undefined) {
        return response.status(400).json({
            error: 'password must be at least 3 characters long' //jos salasana on alle 3 merkkiä, palautetaan status code 400 = bad request ja error
        })
    }

    //jos käyttäjänimi on alle 3 merkkiä
    if (username.length < 3 || username === undefined) {
        return response.status(400).json({
            error: 'username must be at least 3 characters long' //jos käyttäjänimi on alle 3 merkkiä, palautetaan status code 400 = bad request ja error
        })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds) //salataan salasana

    const user = new User({ //luodaan uusi käyttäjä olio
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save() //tallennetaan käyttäjä tietokantaan

    response.status(201).json(savedUser) //201 = created
})


module.exports = usersRouter //viedään käyttäjä routeri käyttöön app.js tiedostossa