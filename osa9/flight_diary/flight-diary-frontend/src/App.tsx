import { useState, useEffect } from 'react' // 9.16
import axios from 'axios' // 9.16

import ShowDiaries from './components/ShowDiaries'
import NewEntryForm from './components/NewEntryForm'

import { getAll } from './services/diaryService' // 9.16

import { createDiary } from './services/diaryService' // 9.17

import { NewDiaryEntry } from './types' // 9.19

const App = () => {

    const [diaries, setDiaries] = useState([]) // 9.16

    const [errorMessage, setErrorMessage] = useState('') // 9.18


    useEffect(() => { // 9.16 - fetch data from server
        async function fetchData() {
            const response = await getAll()
            setDiaries(response)
        }
        fetchData()
    }, [])




    //9.17 add new entry
    const addEntry = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const weatherObject: NewDiaryEntry = { // 9.19 - create object for new entry
                date: event.currentTarget.date.value, // 9.19 - add date from form
                visibility: event.currentTarget.visibility.value, // 9.19 - add visibility from form
                weather: event.currentTarget.weather.value, // 9.19 - add weather from form
                comment: event.currentTarget.comment.value, // 9.19 - add comment from form
            }

            const response = await createDiary(weatherObject) // 9.17 - add new entry, using diaryservice to post data to server
            console.log(response) // 9.17 - log response
            setDiaries(diaries.concat(response)) // 9.17 - add new entry to diaries
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMsg = error.response?.data.replace(
                    'error: ',
                );
                setErrorMessage(errorMsg);

                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);

            } else {
                setErrorMessage('error: something went wrong...') // 9.18 - add error message';
                setTimeout(() => {
                    setErrorMessage('');
                }
                    , 5000);
        }
    }
}


    return (
        <>
            {errorMessage}

            <NewEntryForm addEntry={addEntry} />

            <ShowDiaries diaries={diaries} />

        </>
    )
}

export default App