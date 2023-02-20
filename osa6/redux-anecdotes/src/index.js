import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'

import store from './store' //6.10 store määritelty omaan tiedostoon, importataan se

// luetaan datat json serveriltä servicen avulla
import anecdoteService from './services/anecdotes' 

// importataan action creator
import { setAnecdotes } from './reducers/anecdoteReducer'


anecdoteService.getAll().then(anecdotes => { // haetaan kaikki anekdootit (listana joka sisältää objekteja) servicen avulla
    store.dispatch(setAnecdotes(anecdotes)) // sitten response.datasta dispatchataan setAnecdotes action, joka palauttaa staten jossa on kaikki anekdootit
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)