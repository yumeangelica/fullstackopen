import { useState } from 'react'

const useField = (type) => { // custom hook joka kontrolloi input-kenttien tilaa 
    const [value, setValue] = useState('') // alustetaan tila tyhjäksi

    const onChange = (event) => { // funktio joka asettaa tilan arvoksi input-kentän arvon
        setValue(event.target.value)
    }

    const reset = () => { // funktio joka nollaa tilan
        setValue('')
    }

    return { // palautetaan objekti joka sisältää input-kentän tyypin, tilan ja funktion tilan muuttamiseen
        type,
        value,
        onChange,
        reset
    }
}

export { useField } // exportataan custom hook