import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) // countries state
  const [searchCountry, setSearchCountry] = useState('') // searchCountry input state
  const [filteredCountryList, setfilteredCountryList] = useState([]) // filtered countries state

  useEffect(() => { // fetching data from restcountries api with axios
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled, fetching data from restcountries api')
        setCountries(response.data)
      })
  }
  , [])



  const handleCountryChange = (event) => { // when searchCountry input changes, set searchCountry state to event.target.value
    setSearchCountry(event.target.value)

    if (searchCountry === '') {
        setfilteredCountryList([])
    } else { // filter countries by searchCountry input
        setfilteredCountryList(countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase())))
  }
  }

  return (
    <>
      find countries <input
        value={searchCountry}
        onChange={handleCountryChange}
      />

      <AllCountries filteredCountryList={filteredCountryList} setfilteredCountryList={setfilteredCountryList} setSearchCountry={setSearchCountry} />
    </>
  )
}



// Components

const CountryShow = ({ country }) => { // renders one country

  const languages = Object.values(country.languages)

  // give secret api key to react app
  // start:
  // REACT_APP_API_KEY=keygoeshere npm start
  const apikey = process.env.REACT_APP_API_KEY


  const url_base= "https://api.openweathermap.org/data/2.5/" // base url for open weather map
  const query = `weather?q=${country.capital}&units=metric&appid=${apikey}` // query for open weather map

  const [weather, setWeather] = useState([]) //  state for weather data


  useEffect(() => { // fetching data from openweathermap api with axios
    axios
      .get(`${url_base}${query}`)
      .then(response => {
        console.log('promise fulfilled, fetching data from openweathermap api')
        setWeather(response.data)
      })
  }
  , [query])



  // if weather data is not fetched yet, return only country data, else return country data and weather data
  return (
    <>

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

    </>
  )
}


const AllCountries = ({ filteredCountryList, setfilteredCountryList, setSearchCountry }) => { // renders all countries

  if (filteredCountryList.length > 10) { // if filteredCountryList.length is over 10, return message
    return <p>Too many matches, specify another filter</p>
  }
  else if (filteredCountryList.length <= 10 && filteredCountryList.length > 1) {
    return (
      <>
        {filteredCountryList.map(country =>
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => {
                setSearchCountry(country.name.common) // set country name to searchCountry input
                setfilteredCountryList([country]) // set country to filteredCountryList
            }}>show</button>
          </div>)}
      </>
    )
  } // if filteredCountryList.length is 1, return country
  else if (filteredCountryList.length === 1) {
    return (
      <CountryShow country={filteredCountryList[0]} />
    )
  }
}



export default App;
