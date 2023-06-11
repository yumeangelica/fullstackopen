// komponentti joka renderöi suodatetut henkilöt
const FilteredPersonsShow = (props) => {
	return (
		<div>
			{props.filteredPersons.map(person =>
				<p key={person.id}>{person.name} {person.number}
					<button className="deletebtn" onClick={() => props.action(person.id)}>delete</button>
				</p>)}

		</div>
	)
}



// Exportataan komponentti App.js tiedostoon
export default FilteredPersonsShow