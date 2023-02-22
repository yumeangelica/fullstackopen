import { useState, useEffect } from 'react'
import axios from 'axios'

// custom hook, joka palauttaa inputin tiedot
const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => { // asetetaan inputin value stateen
        setValue(event.target.value)
    }

    return { // palautetaan inputin tiedot objektina
        type,
        value,
        onChange
    }
}

// custom hook, joka hakee maan tiedot
const useCountry = (name) => {
    const [country, setCountry] = useState(null) // alustetaan country state

    useEffect(() => { // useEffect hook, joka suoritetaan kun name muuttuu
        if (name !== '') { // jos name on tyhjä, ei tehdä mitään
            axios // haetaan maan tiedot axiosilla
                .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                .then(res => { 
                    const countryObject = { // muodostetaan objekti, joka sisältää maan tiedot
                        name: res.data[0].name.common,
                        capital: res.data[0].capital,
                        population: res.data[0].population,
                        flag: res.data[0].flags.png
                    }
                    setCountry({ data: countryObject, found: true }) }) // asetetaan country obj stateen
                .catch(err => { // jos maata ei löydy, asetetaan country stateen {found: false} objekti
                    setCountry({ found: false })
                })
            }
    }, [setCountry, name]) // useEffect hookin riippuvuudet
    
    return country // palautetaan country state
}

// komponentti, joka renderöi maan tiedot
const Country = ({ country }) => { // ottaan parametrina country objektin statesta
    
    if (!country) {
        return
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.data.name}</h3>
            <div>capital {country.data.capital}</div>
            <div>population {country.data.population}</div>
            <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
        </div>
    )

} 




// pääkomponentti
const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name) // käytetään custom hookia mikä palauttaa country state

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={fetch}> {/* kutsutaan fetch funktiota */}
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country} />
            
        </div>
    )
}

export default App
