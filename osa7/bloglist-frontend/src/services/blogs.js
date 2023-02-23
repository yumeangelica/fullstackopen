import axios from 'axios'


let token = null //token muuttuja, joka aluksi null

//asetetaan token muuttujaan token
const setToken = newToken => { //setToken funktio, joka saa parametrina newTokenin
    token = `bearer ${newToken}` //token
}


//tekee get pyynnön backendiin ja palauttaa kaikki blogit
const getAll = async () => {
    const response = await axios.get('/api/blogs')
    // console.log('get all: response.data: ', response.data)
    return response.data
}


//tekee pyynnön backendiin ja palauttaa käyttäjät
const getUsers = async () => {
    const response = await axios.get('/api/users')
    // console.log('get all users: response.data: ', response.data)
    return response.data
}

const getUserById = async (id) => {
    const response = await axios.get(`/api/users/${id}`)
    // console.log('get user by id: response.data: ', response.data)
    return response.data
}

const getBlogById = async (id) => {
    const response = await axios.get(`${'/api/blogs'}/${id}`)
    // console.log('get blog by id: response.data: ', response.data)
    return response.data
}



//tekee post pyynnön backendiin ja palauttaa uuden blogin
const create = async newObject => {
    const config = { //config objekti, joka sisältää Authorization-headerin, lähetetään kolmantena parametrina axios.post pyynnössä
        headers: { Authorization: token }, //asettaa moduulin tallessa pitämän tokenin Authorization-headeriin
    }

    const response = await axios.post('/api/blogs', newObject, config) //post pyyntö backendiin, token mukana kolmantena parametrina
    // console.log('creating: response.data: ', response.data)
    return response.data
}


//tekee put pyynnön backendiin ja palauttaa päivitetyn blogin
const update = async (id, newObject) => {
    const response = await axios.put(`${'/api/blogs'}/${id}`, newObject)
    console.log('updating: response.data: ', response.data)
    return response.data
}

const deleteBlog = async (id) => {
    const config = { //config objekti, joka sisältää Authorization-headerin, lähetetään kolmantena parametrina axios.post pyynnössä
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${'/api/blogs'}/${id}`, config)
    return response.data
}


//luodaan blogsService objekti, joka sisältää getAll, create ja update funktiot
const blogsService = {
    getAll, //ei kaarisulkuja tänne tai invokee, funktio lähetetään referenssinä
    create,
    update,
    deleteBlog,
    setToken,
    getUsers,
    getUserById,
    getBlogById
}

export default blogsService //exportataan blogsService objekti