import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef((props, ref) => { //props.children sisältää komponentin sisällön viittaa komponenttiin, joka on Togglable komponentin sisällä
    const [visible, setVisible] = useState(false) //komponentti näkyy aluksi

    const hideWhenVisible = { display: visible ? 'none' : '' } //jos komponentti näkyy, piilotetaan nappi
    const showWhenVisible = { display: visible ? '' : 'none' } //jos komponentti piilotettu, näytetään nappi

    const toggleVisibility = () => { //näytetään tai piilotetaan komponentti
        setVisible(!visible)

    }

    useImperativeHandle(ref, () => { //tän avulla päästään käsiksi komponenttiin ulkopuolelta, koska Togglable komponentti on forwardRef
        return {
            toggleVisibility //tämä oon vaan funktio joka on referenssinä, invoketaan joskus muualla tarpeen tullen
        }
    })


    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>cancel</button>
                {props.children}
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable' //näyttää komponentin nimen devToolsissa

//ottaa kiinni Togglable komponentista ja määrittelee sen PropTypet ennen exporttausta
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired //buttonLabel on pakollinen prop, vaatii stringin
}

export default Togglable