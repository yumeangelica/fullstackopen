import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'
describe('unicafe reducer', () => {
    const initialState = { // tänne tallennetaan staten alkuarvot
        good: 0,
        ok: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => { // tämä testi tarkistaa, että reducer palauttaa staten alkuarvot, jos state on undefined
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(undefined, action) //tämä kutsuu reduceria, joka saa parametrina undefinedin ja actionin
        expect(newState).toEqual(initialState) //tämä tarkistaa, että reducer palauttaa staten alkuarvot
    })

    test('good is incremented', () => { //tämä testi tarkistaa, että reducer lisää yhden goodin staten arvoon
        const action = {
            type: 'GOOD'
        }
        const state = initialState //staten alkuarvot

        deepFreeze(state) //estää reducerin muuttamasta staten arvoja
        const newState = counterReducer(state, action) //kutsuu reduceria, joka saa parametrina staten alkuarvot ja actionin
        expect(newState).toEqual({ //tarkistaa, että reducer palauttaa uuden staten, jossa on lisätty yksi good
            good: 1,
            ok: 0,
            bad: 0
        })
    })

    test('ok is incremented', () => { //tämä testi tarkistaa, että reducer lisää yhden ok:n staten arvoon
        const action = {
            type: 'OK',
        }
        const state = initialState //staten alkuarvot

        deepFreeze(state) //estää reducerin muuttamasta staten arvoja
        const newState = counterReducer(state, action) //kutsuu reduceria, joka saa parametrina staten alkuarvot ja actionin
        expect(newState).toEqual({ //tarkistaa, että reducer palauttaa uuden staten, jossa on lisätty yksi ok
            good: 0,
            ok: 1,
            bad: 0,
        })
    })

    test('bad is incremented', () => { //tämä testi tarkistaa, että reducer lisää yhden badin staten arvoon
        const action = {
            type: 'BAD',
        }
        const state = initialState //staten alkuarvot

        deepFreeze(state) //estää reducerin muuttamasta staten arvoja
        const newState = counterReducer(state, action) //kutsuu reduceria, joka saa parametrina staten alkuarvot ja actionin
        expect(newState).toEqual({ //tarkistaa, että reducer palauttaa uuden staten, jossa on lisätty yksi bad
            good: 0,
            ok: 0,
            bad: 1,
        })
    })

    test('ZERO resets the state', () => { //tämä testi tarkistaa, että reducer palauttaa staten alkuarvot
        const action = { //actionin tyypinä on ZERO
            type: 'ZERO',
        }
        const state = initialState //staten alkuarvot

        deepFreeze(state) //estää reducerin muuttamasta staten arvoja
        const newState = counterReducer(state, action) //kutsuu reduceria, joka saa parametrina staten alkuarvot ja actionin
        expect(newState).toEqual({ //tarkistaa, että reducer palauttaa staten alkuarvot
            good: 0,
            ok: 0,
            bad: 0,
        })
    })
})