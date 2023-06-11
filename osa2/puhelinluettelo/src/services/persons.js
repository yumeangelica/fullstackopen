import axios from 'axios'
const baseUrl = '/api/persons' // backendin osoite


const getAll = () => {
	return axios.get(baseUrl) // palauttaa kaiken datan databasesta
}

const create = (newPerson) => {
	return axios.post(baseUrl, newPerson)
}

//asettaa uuden numeron henkilölle
const update = (id, newNumber) => {
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personServiceObject = {
    getAll,
    create,
    update,
    remove
};

export default personServiceObject