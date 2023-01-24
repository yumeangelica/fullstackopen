import { useState } from 'react'

const Togglable = (props) => { //props.children sisältää komponentin sisällön viittaa komponenttiin, joka on Togglable komponentin sisällä
  const [visible, setVisible] = useState(false) //komponentti näkyy aluksi

  const hideWhenVisible = { display: visible ? 'none' : '' } //jos komponentti näkyy, piilotetaan nappi
  const showWhenVisible = { display: visible ? '' : 'none' } //jos komponentti piilotettu, näytetään nappi

  const toggleVisibility = () => { //näytetään tai piilotetaan komponentti
    setVisible(!visible)

  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children} 
        
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable