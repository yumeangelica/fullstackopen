import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null //token muuttuja, joka aluksi null

//asetetaan token muuttujaan token
const setToken = newToken => { //setToken funktio, joka saa parametrina newTokenin
  token = `bearer ${newToken}` //token
}


//tekee get pyynnön backendiin ja palauttaa kaikki blogit
const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('get all: response.data: ', response.data)
  return response.data
}


//tekee post pyynnön backendiin ja palauttaa uuden blogin
const create = async newObject => {
  const config = {
    headers: { Authorization: token }, //asettaa moduulin tallessa pitämän tokenin Authorization-headeriin
  }

  const response = await axios.post(baseUrl, newObject, config) //post pyyntö backendiin, token mukana kolmantena parametrina
  console.log('creating: response.data: ', response.data)
  return response.data
}


//tekee put pyynnön backendiin ja palauttaa päivitetyn blogin
const update = async (id, newObject) => { 
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log('updating: response.data: ', response.data)
  return response.data
}


//luodaan blogsService objekti, joka sisältää getAll, create ja update funktiot
const blogsService = {
  getAll, //ei kaarisulkuja tänne tai invokee, funktio lähetetään referenssinä
  create,
  update,
  setToken
}

export default blogsService //exportataan blogsService objekti