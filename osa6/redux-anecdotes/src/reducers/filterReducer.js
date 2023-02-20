import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({ // createSlice luo reducerin ja action creatorit
	name: 'filter',
	initialState: '', // alkutilan lista on tyhjä
	reducers: { // reducerit, käsittelee yhden anekdootin kerrallaan
		filterAnecdotes(_, action) {
			return action.payload // payload on actionin data, eli input-kentän arvo
		}
	}
})

export const { filterAnecdotes } = filterSlice.actions // nämä on reducerin funktioita
export default filterSlice.reducer // reduceris