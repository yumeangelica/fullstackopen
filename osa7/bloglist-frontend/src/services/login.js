//tekee login pyynnön backendiin

import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    console.log('response.data: ', response.data)
    return response.data
}

// luodaan loginService objekti, joka sisältää login funktion
const loginService = {
    login //ei kaarisulkuja tänne tai invokee, funktio lähetetään referenssinä
}

export default loginService //exportataan loginService objekti


