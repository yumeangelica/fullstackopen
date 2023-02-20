import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

//6.10 määritellään store omassa tiedostossaan
const store = configureStore({ // luodaan store
    reducer: { // reducer objekti joka sisältää reducerit
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer // 6.12 lisätty notificationReducer
    }
})



export default store