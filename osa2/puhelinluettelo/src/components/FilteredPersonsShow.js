const FilteredPersonsShow = (props) => {
	return (
		<>
			{props.filteredPersons.map(person =>
				<p key={person.id}>{person.name} {person.number}
					<button className="deletebtn" onClick={() => props.action(person.id)}>delete</button>
				</p>)}

		</>
	)
}


export default FilteredPersonsShow