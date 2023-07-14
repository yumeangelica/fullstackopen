import axios from 'axios'

import { NewDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3003/api/diaries'


export const getAll = async () => { // 9.16 - fetch data from server
    const response = await axios.get(baseUrl)
    console.log(response.data)
    return response.data
}


export const createDiary = async (obj: NewDiaryEntry) => { // 9.17 - add new entry, using diaryservice to post data to server
    try{
        const response = await axios.post(baseUrl, obj)
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}




