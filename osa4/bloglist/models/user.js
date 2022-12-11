const mongoose = require('mongoose')


const userSchema = mongoose.Schema({ //määritellään skeema, kertoo miten olio tallennetaan tietokantaan
  username: { //tarkistetaan, että käyttäjänimi on uniikki
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  name: String,
  passwordHash: { // vaaditaan salasana
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' //Mongoosen populate-funktion toiminnallisuus perustuu tämän referenssin oikein määrittelyyn
    }
  ],
})

userSchema.set('toJSON', { //muokataan palautettua jsonia, poistetaan mongon __v
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash //poistetaan salasana
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User