import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);



const good = () => { //good funktio dispatchaa actionin, joka lisää yhden goodin staten arvoon
    store.dispatch({
        type: "GOOD",
    })
}

const ok = () => { //ok funktio dispatchaa actionin, joka lisää yhden ok:n staten arvoon
    store.dispatch({
        type: "OK",
    })
}

const bad = () => { //bad funktio dispatchaa actionin, joka lisää yhden badin staten arvoon
    store.dispatch({
        type: "BAD",
    })
}

const reset = () => { //reset funktio dispatchaa actionin, joka nollaa staten arvot
    store.dispatch({
        type: "ZERO",
    })
}

//Pääfunktio
const App = () => {

    //renderöi buttonit ja staten tiedot arvoille good, ok, bad
    return (
        <>
            <button onClick={good}>good</button>
            <button onClick={ok}>ok</button>
            <button onClick={bad}>bad</button>
            <button onClick={reset}>reset stats</button>

            <div>good {store.getState().good}</div>
            <div>ok {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root')) //root elementti

const renderfunktio = () => { //renderöi uudelleen kun staten arvo muuttuu
    root.render(<App />)
}

renderfunktio() //renderöi ensimmäisen kerran

store.subscribe(renderfunktio) //renderöi uudelleen kun staten arvo muuttuu