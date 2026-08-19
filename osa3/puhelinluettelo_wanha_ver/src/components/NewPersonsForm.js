// komponentti joka renderöi lomakkeen millä lisätään uusi henkilö
const NewPersonForm = (props) => {
    return (
      <form onSubmit={props.functions[0]}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.functions[1]} />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.functions[2]} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
// Exportataan komponentti App.js tiedostoon
export default NewPersonForm  