const initialState = { // tänne tallennetaan staten alkuarvot
    good: 0,
    ok: 0,
    bad: 0,
}

const counterReducer = (state = initialState, action) => { // tämä funktio saa parametrina state:n ja actionin
    console.log(action)
    switch (action.type) { // tämä switch-case lauseke tarkistaa actionin tyypin
        case "GOOD":
            return { ...state, good: state.good + 1 } // tämä palauttaa uuden staten, jossa on lisätty yksi good
        case "OK":
            return { ...state, ok: state.ok + 1 } // tämä palauttaa uuden staten, jossa on lisätty yksi ok
        case "BAD":
            return { ...state, bad: state.bad + 1 } // tämä palauttaa uuden staten, jossa on lisätty yksi bad
        case "ZERO":
            return initialState // tämä palauttaa staten alkuarvot
        default:
            return initialState // tämä palauttaa staten alkuarvot
    }
}

export default counterReducer