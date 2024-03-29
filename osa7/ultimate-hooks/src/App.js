import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]) // resurssin state, tänne tallennetaan resurssin sisältö ja sen setteri

    useEffect(() => { // hakee resurssin aina, kun baseUrl muuttuu
        axios
            .get(baseUrl)
            .then(response => {
                setResources(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [baseUrl])

  const create = (resource) => { // luo resurssin, ottaa parametrina resurssin sisällön objektina
    axios
      .post(baseUrl, resource)
      .then(response => {
        setResources(resources.concat(response.data)) // resursseihin concatataan uusi resurssi ja ne asetetaan stateen
      })
      .catch(error => {
        console.log(error)
      })
  }

  const service = { // objekti, jossa on funktiot
    create
  }

  // palauttaa resurssin staten ja sen muokkaamiseen tarvittavat service funktiot
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    console.log('persons', persons)
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App






// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const useField = (type) => {
//     const [value, setValue] = useState('')

//     const onChange = (event) => { // asettaa inputin arvon stateen
//         setValue(event.target.value)
//     }

//     return { // palauttaa objektin, jossa on value, onChange ja type
//         type,
//         value,
//         onChange
//     }
// }

// // custom hook, joka palauttaa resurssin ja sen muokkaamiseen tarvittavat funktiot
// const useResource = (baseUrl) => {

//     const [resources, setResources] = useState([])


//     const fetchAll = () => { // hakee resurssin
//         axios
//             .get(baseUrl) // baseUrl on parametri, joka saadaan App-komponentista
//             .then(response => {
//                 setResources(response.data) // asettaa resurssin stateen
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     const create = (resource) => { // luo resurssin
//         axios
//             .post(baseUrl, resource)
//             .then(response => {
//                 setResources(resources.concat(response.data)) // lisää uuden resurssin vanhojen joukkoon
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     const service = { // luo objektin, jossa on funktiot
//         create, fetchAll
//     }

//     return [ // palauttaa resurssin staten ja sen muokkaamiseen tarvittavat funktiot
//         resources, service
//     ]
// }

// const App = () => {
//     const content = useField('text') // käyttää useField-hookia inputteja varten
//     const name = useField('text')
//     const number = useField('text')

//     const [notes, noteService] = useResource('http://localhost:3005/notes') // käyttää useResource-hookia resurssien muokkaamiseen
//     const [persons, personService] = useResource('http://localhost:3005/persons')

    
    
//     noteService.fetchAll()
//     personService.fetchAll()
    
    


//     const handleNoteSubmit = (event) => {
//         event.preventDefault()
//         noteService.create({ content: content.value })
//     }

//     const handlePersonSubmit = (event) => {
//         event.preventDefault()
//         personService.create({ name: name.value, number: number.value })
//     }

//     return (
//         <div>
//             <h2>notes</h2>
//             <form onSubmit={handleNoteSubmit}>
//                 <input {...content} />
//                 <button>create</button>
//             </form>
//             {notes.map(n => <p key={n.id}>{n.content}</p>)}

//             <h2>persons</h2>
//             <form onSubmit={handlePersonSubmit}>
//                 name <input {...name} /> <br />
//                 number <input {...number} />
//                 <button>create</button>
//             </form>
//             {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
//         </div>
//     )
// }

// export default App