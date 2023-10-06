import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import FilteredPersonsShow from './components/FilteredPersonsShow'
import NewPersonForm from './components/NewPersonsForm'
import ErrorMessage from './components/ErrorMessage'

import personService from './services/persons' // axios calls


let errorhappened = false // variable for error message

const App = () => {
  const [persons, setPersons] = useState([]) // persons state

  const [newName, setNewName] = useState('') // form inputs states
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('') // filter state

  const [errorMessage, setErrorMessage] = useState(null) // error message state


  useEffect(() => { // fetch data
    console.log('effect')
    personService
      .getAll() 
      .then(response => {
        setPersons(response.data)
        console.log('promise fulfilled')
        console.log('response.data', response.data)
      })
  }, [])


  const removePerson = (id) => { // remove person
    const person = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${person.name}?`)

    if (result) { // if user clicks ok, remove person
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('response after delete', response.data)

          setErrorMessage( // set error message
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)

        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }



  const addName = (event) => { // add person
    event.preventDefault()
    console.log('button clicked', event.target)

    const nameObject = {
      name: newName,
      number: newNumber
    }


    if (persons.some(person => person.name === newName)) { // check if name already exists in persons array

      if (persons.some(person => person.number !== newNumber)) { // check if number is different from the number in persons array

        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

        if (result) { // if user clicks ok, update number
          personService
            .update(persons.find(person => person.name === newName).id, nameObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
              console.log('response after update', response.data)

              setErrorMessage(
                `Updated ${nameObject.name}'s number`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)

            }
            )
            .catch(error => {
              console.log('fail')

              errorhappened = true

              setErrorMessage(
                `Information of ${nameObject.name} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null); errorhappened = false;
              }, 3000)


            })
        }
      }
      
    } else {

      personService
        .create(nameObject) // create new person
        .then(response => {
          console.log('response after post', response.data)
          setPersons(persons.concat(nameObject)) // set new person to persons array

          setErrorMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log('error', error.response.data)
          setErrorMessage( 
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)

        }
        )
    }

    setNewName('') // reset form inputs
    setNewNumber('')

  }



  // filter persons array
  const filteredPersons = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  // event handlers for form inputs
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }



  return (
    <div className="container"> {/* container on bootstrapin luokka, joka keskittää sivun sisällön */}
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage} errorhappened={errorhappened} />

      <Filter
        onChange={handleFilterChange}
        value={newFilter} />

      <h2>add a new</h2>

      <NewPersonForm 
      newName={newName} 
      newNumber={newNumber} 
      functions={[addName, handleNameChange, handleNumberChange]} 
      />

      <h2>Numbers</h2>

      <FilteredPersonsShow filteredPersons={filteredPersons} action={removePerson} />

    </div>
  )

}


export default App