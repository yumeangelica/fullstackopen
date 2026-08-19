import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
	return axios.get(baseUrl)
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