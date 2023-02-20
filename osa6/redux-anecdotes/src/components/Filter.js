import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => { //Filter komponentti joka renderöi input-kentän
    
    const dispatch = useDispatch() // dispatch funktio
    
    const handleChange = (event) => {

        dispatch(filterAnecdotes(event.target.value)) // dispatchataan filterAnecdotes funktio, joka saa parametrina input-kentän arvon
    }

    return (
        <div style={{marginBottom: '10px'}}>
            filter <input onChange={handleChange} /> {/* kutsuu handleChange funktiota kun input-kentässä tapahtuu muutoksia */}
        </div>
    )
}

export default Filter