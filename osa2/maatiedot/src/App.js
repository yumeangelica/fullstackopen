import { useState, useEffect } from 'react'

//Importataan axios
import axios from 'axios'

const App = () => {

  // luodaan taulukko johon tallennetaan maan tiedot
  const [countries, setCountries] = useState([])

  // kontrolloi lomakkeen syötettä
  const [searchCountry, setSearchCountry] = useState('')


  // Haetaan maatiedot axiosilla
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        // console.log('response.data', response.data)
        //tallennetaan noudetut maatiedot countries-taulukkoon
        setCountries(response.data)
      })
  }

  useEffect(hook, [])


  //console logataan countries-taulukko
  // console.log('countries', countries)


  // tallennetaan etsityt maat countryList-taulukkoon
  let countryList = []

  // jos hakukenttä on tyhjä, ei näytetä mitään
  if (searchCountry === '') {
    countryList = []
  } else { // muuten etsitään hakusanan mukaisia maita ja tallennetaan ne countryList-taulukkoon
    countryList = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
  }


  // käsittelee country inputin syötteen muutokset reaaliaikaisesti, value tallentuu setsearchCountry tilaan
  const handleCountryChange = (event) => {
    // console.log(event.target.value)
    setSearchCountry(event.target.value)
  }


  // App renderöi komponentit
  return (
    <div>
      find countries <input
        value={searchCountry}
        onChange={handleCountryChange}
      />

      <AllCountries countries={countryList} action={setSearchCountry} />

    </div>
  )

}



//KOMPONENTIT

// Näyttää yhden maan tiedot
const CountryShow = ({ country }) => {

  const languages = Object.values(country.languages)

  // Apikey, baseurl ja niistä muodostettu url openweathermapille

  // Salainen apikey annetaan käynnistyksen yhteydessä
  // Käynnistä:
  // REACT_APP_API_KEY=salattuavaintähän npm start
  const apikey = process.env.REACT_APP_API_KEY


  const url_base= "https://api.openweathermap.org/data/2.5/" //base url for open weather map
  const query = `weather?q=${country.capital}&units=metric&appid=${apikey}` //url for open weather map

  // luodaan tilat säätilalle
  const [weather, setWeather] = useState([])

  // Haetaan maan pääkaupunkikohtainen säätila axiosilla openweathermapista
  const hook = () => {
    console.log('effect')
    axios
      .get(`${url_base}${query}`)
      .then(response => {
        console.log('promise fulfilled')
        // console.log('response.data', response.data)
        //tallennetaan noudetut säätiedot säätaulukkoon
        setWeather(response.data)
      })
  }

  useEffect(hook, [query])

  // Console logataan noudettu säätila
  console.log('weather', weather)


  // Jos säätilaa ei ole saatavilla, näytetään vain maan tiedot, jos säätila on saatavilla, näytetään myös säätila
  return (
    <div>

      <h1>{country.name.common}</h1>
      
      <p>capital {country.capital}</p>

      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {languages.map(language => 
          <li key={language}>{language}</li>)}
      </ul>

      <img src={country.flags.png} alt = {country} />

      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.main?.temp} Celsius</p>
      
      {weather.weather?.map(weather =>
        <img key={weather.id} src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt = {weather.description} />
      )}

      <p>wind {weather.wind?.speed} m/s</p>

    </div>
  )
}


// Näyttää kaikki maat
const AllCountries = ({ countries, action }) => {

  if (countries.length > 10) { // jos maat.length > 10, näytetään vain viesti ja kehotetaan tarkentamaan hakua
    return <p>Too many matches, specify another filter</p>
  } // jos maat.length on alle 10 ja yli 1 niin näytetään maat mappaamalla ne countries-taulukosta
  //lisätään nappi jota painamalla maan tiedot näytetään, koska maan nimi asetetaan hakukenttään
  else if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => action(country.name.common)}>show</button>
          </div>)}
      </div>
    )
  } // jos maat.length on 1, näytetään maan tiedot listan ekasta indeksistä
  else if (countries.length === 1) {
    return (
      <CountryShow country={countries[0]} />
    )
  }
}





// Exportataan App-komponentti App.js tiedostosta Index.js tiedostoon
export default App;
