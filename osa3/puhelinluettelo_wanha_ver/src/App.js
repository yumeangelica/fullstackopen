import { useState, useEffect } from 'react'

//Importataan komponentit moduuleista
import Filter from './components/Filter'
import FilteredPersonsShow from './components/FilteredPersonsShow'
import NewPersonForm from './components/NewPersonsForm'
import ErrorMessage from './components/ErrorMessage'



//Importataan personService moduuli mikä sisältää axios-kutsut
import personService from './services/persons'

// Alustetaan virheilmoitukselle arvo false
let errorhappened = false

const App = () => {


  // luodaan taulukko johon tallennetaan henkilön tiedot
  const [persons, setPersons] = useState([])

  // kontrolloi lomakkeen syötettä
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // kontrolloi filtterin syötettä
  const [newFilter, setNewFilter] = useState('')


  // kontrolloi virheilmoituksen näyttämistä
  const [errorMessage, setErrorMessage] = useState(null)



  // Haetaan tietokannasta henkilöt
  const hook = () => {
    console.log('effect')
    personService
      .getAll() // palauttaa kaiken datan databasesta
      .then(response => {
        setPersons(response.data)
        console.log('promise fulfilled')
        console.log('response.data', response.data)
      })
  }

  useEffect(hook, [])


  // funktio henkilön poistamiseen
  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${person.name}?`)

    // jos käyttäjä painaa ok, poistetaan henkilö
    if (result) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('response after delete', response.data)


          // asetetaan virheilmoitus, kun henkilö on poistettu
          setErrorMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => { // asetetaan 3 sekunnin ajan virheilmoitus näkyviin
            setErrorMessage(null)
          }, 3000)

        })
        // jos poisto ei onnistu, catchataan virhe
        .catch(error => {
          console.log('fail')
        })
    }
  }



  // LUODAAN ID JOKA ON YKSILÖLLINEN
  let unique_id = 0 //alustetaan unique_id muuttuja 0

  // luodaan algoritmi joka generoi uniikin id:n, eikä mene sekaisin vaikka henkilöitä poistetaan välillä
  if (persons.length > 0) {
    unique_id = persons[persons.length - 1].id + Math.random() * 10000
    unique_id = Math.floor(unique_id)
  }




  // tapahtumankäsittelijä lomakkeen lähettämiseen kun submit painiketta painetaan
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    // luodaan uusi henkilöolio uniikilla id:llä, nimi tulee input kentästä ja id tulee persons taulukon pituudesta +1
    const nameObject = {
      name: newName,
      id: unique_id, // asetetaan tähän unique_id, pitäisikö jättää palvelimen vastuulle generoida id??
      number: newNumber
    }



    // tarkistetaan onko henkilö jo olemassa
    if (persons.some(person => person.name === newName)) {
      // alert(`${newName} is already added to phonebook`) // jos nimi löytyy, ilmoitetaan siitä alertilla

      //tarkistetaan onko numero muuttunut
      if (persons.some(person => person.number !== newNumber)) {

        //tarkistetaan onko käyttäjä varma vaihtamisesta
        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

        // jos käyttäjä on varma eli painaa ok ja window.confirm palauttaa true, niin suoritetaan päivitys personService.update-metodilla
        if (result) {
          personService
            .update(persons.find(person => person.name === newName).id, nameObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
              console.log('response after update', response.data)

              // asetetaan virheilmoitus, kun henkilö on lisätty
              setErrorMessage(
                `Updated ${nameObject.name}'s number`
              )
              setTimeout(() => { // asetetaan 3 sekunnin ajan virheilmoitus näkyviin
                setErrorMessage(null)
              }, 3000)

            }
            )
            // jos päivitys ei onnistu, catchataan virhe
            .catch(error => {
              console.log('fail')

              errorhappened = true

              //asetetaan virheilmoitus, kun henkilöä ei löydy
              setErrorMessage(
                `Information of ${nameObject.name} has already been removed from server`
              )
              setTimeout(() => { // asetetaan 3 sekunnin ajan virheilmoitus näkyviin
                setErrorMessage(null); errorhappened = false;
              }, 3000)


            })
        }
      }


      // lisätään uusi henkilöolio persons-taulukkoon concat-metodilla jos nimeä ei löydy persons-taulukosta
    } else {

      //HTTP POST
      personService // tämä on moduuli joka sisältää axios-kutsut
        .create(nameObject) // luodaan uusi henkilöolio palvelimelle axios.post-metodilla
        .then(response => {
          console.log('response after post', response.data)
          setPersons(persons.concat(nameObject)) // jos nimeä ei löydy, lisätään uusi henkilöolio persons-taulukkoon

          // asetetaan virheilmoitus, kun henkilö on lisätty
          setErrorMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => { // asetetaan 3 sekunnin ajan virheilmoitus näkyviin
            setErrorMessage(null)
          }, 3000)

        })
    }

    //tyhjennetään lomakkeen input kenttä, asetetaan uusi tila newNamelle ja newNumberille
    setNewName('')
    setNewNumber('')

  }



  // filtteröi henkilöt persons-taulukosta newFilter-muuttujan mukaan
  const filteredPersons = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  // MUUTOKSENKÄSITELIJÄT
  // käsittelee nimilomakkeen syötteen muutokset reaaliaikaisesti
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // käsittelee numerolomakkeen syötteen muutokset reaaliaikaisesti
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //filterille muutoksenkäsittelijä
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }



  // App renderöi Filter-komponentin, NewPersonForm-komponentin ja FilteredPersonsShow-komponentin
  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage} errorhappened={errorhappened} />

      <Filter
        onChange={handleFilterChange}
        value={newFilter} />

      <h2>add a new</h2>

      <NewPersonForm newName={newName} newNumber={newNumber} functions={[addName, handleNameChange, handleNumberChange]} />

      <h2>Numbers</h2>

      <FilteredPersonsShow filteredPersons={filteredPersons} action={removePerson} />


    </div>
  )

}



//Exportataan App.js tiedostoon Index.js
export default App