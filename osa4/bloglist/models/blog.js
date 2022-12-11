const mongoose = require('mongoose') //otetaan mongoose käyttöön


const blogSchema = mongoose.Schema({ //määritellään skeema, kertoo miten olio tallennetaan tietokantaan
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: { //tallennetaan viittaus käyttäjään
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //Mongoosen populate-funktion toiminnallisuus perustuu tämän referenssin oikein määrittelyyn
      }
})



//muokataan palautettua jsonia, poistetaan mongon __v
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString() //muutetaan id stringiksi
        delete returnedObject._id
        delete returnedObject.__v
    }
})





module.exports = mongoose.model('Blog', blogSchema) //määritellään skeemaa vastaava malli ja exportataan