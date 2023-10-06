import axios from 'axios'
const baseUrl = '/api/persons' // base url for axios calls


const getAll = () => {
	return axios.get(baseUrl) // returns all persons
}

const create = (newPerson) => { // creates new person
	return axios.post(baseUrl, newPerson)
}

const update = (id, newNumber) => { // updates person's number
    return axios.put(`${baseUrl}/${id}`, newNumber)
}

const remove = (id) => { // removes person
    return axios.delete(`${baseUrl}/${id}`)
}

const personServiceObject = {
    getAll,
    create,
    update,
    remove
};

export default personServiceObject