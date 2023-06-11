// komponentti joka renderöi filtteröintilomakkeen
const Filter = (props) => {
    return (
      <div>
        filter shown with <input
          onChange={props.onChange}
          value={props.value}
        />
  
      </div>
    )
  }


// Exportataan komponentti App.js tiedostoon
export default Filter