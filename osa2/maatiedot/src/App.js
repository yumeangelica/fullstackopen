import { useState, useEffect } from 'react'

//Importataan axios
import axios from 'axios'

const App = () => {

  // kaikki maat tallennetaan countries-taulukkoon
  const [countries, setCountries] = useState([])

  // input kentän syöte tallennetaan searchCountry tilaan
  const [searchCountry, setSearchCountry] = useState('')

  // filtteröidyt maat tallennetaan filteredCountryList-taulukkoon
  const [filteredCountryList, setfilteredCountryList] = useState([])


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



  // aina kun inputtia muokataan niin kutsutaan handleCountryChange funktiota
  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)

    // jos hakukenttä on tyhjä, filtteröity lista on tyhjä
    if (searchCountry === '') {
        setfilteredCountryList([])
    } else { // muuten etsitään hakusanan mukaisia maita ja tallennetaan ne filteredCountryList-taulukkoon
        setfilteredCountryList(countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase())))
  }
  }


  // App renderöi komponentit
  return (
    <div>
      find countries <input
        value={searchCountry}
        onChange={handleCountryChange}
      />

      <AllCountries filteredCountryList={filteredCountryList} setfilteredCountryList={setfilteredCountryList} setSearchCountry={setSearchCountry} />

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
const AllCountries = ({ filteredCountryList, setfilteredCountryList, setSearchCountry }) => {

  if (filteredCountryList.length > 10) { // jos maat.length > 10, näytetään vain viesti ja kehotetaan tarkentamaan hakua
    return <p>Too many matches, specify another filter</p>
  } // jos maat.length on alle 10 ja yli 1 niin näytetään maat mappaamalla ne filteredCountryList-taulukosta
  //lisätään nappi jota painamalla maan tiedot näytetään, koska maan nimi asetetaan hakukenttään
  else if (filteredCountryList.length <= 10 && filteredCountryList.length > 1) {
    return (
      <div>
        {filteredCountryList.map(country =>
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => {
                setSearchCountry(country.name.common) // asetetaan hakukenttään maan nimi
                setfilteredCountryList([country]) // asetetaan filtteröityyn listaan yhden maan tiedot
            }}>show</button>
          </div>)}
      </div>
    )
  } // jos maat.length on 1, näytetään maan tiedot listan ekasta indeksistä
  else if (filteredCountryList.length === 1) {
    return (
      <CountryShow country={filteredCountryList[0]} />
    )
  }
}





// Exportataan App-komponentti App.js tiedostosta Index.js tiedostoon
export default App;
