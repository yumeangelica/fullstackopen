// Komponentti joka renderöi virheilmoituksen

// Propsina message ja errorhappened muuttujat
const ErrorMessage = ({ message, errorhappened }) => {
  // jos virheilmoitus on null, ei renderöidä mitään
  if (message === null) {
    return null
  }

  // jos errorhappened on true, eli tapahtuu fail, niin asetetaan virheilmoitukselle punainen tausta
  else if (errorhappened) {
    return (
      <div className="error_red">
        {message}
      </div>
    )
  }

  // muuten virheilmoitukselle vihreä tausta
  else {
    return (
      <div className="greenmessage">
        {message}
      </div>
    )
  }
}


// Exportataan komponentti App.js tiedostoon
export default ErrorMessage