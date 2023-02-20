import { createSlice } from '@reduxjs/toolkit'


// 6.12 reducer, joka käsittelee notificationin tilaa
const notificationSlice = createSlice({ // createSlice luo reducerin ja action creatorit
    name: 'notification',
    initialState: '', // alkutilan arvo on tyhjä
    reducers: { // reducerit, käsittelee yhden anekdootin kerrallaan
        setNotification(_, action) {
            return action.payload // payload on actionin data
        },
        clearNotification() {
            return '' // palautetaan alkutilaan
        }
    }
})

// 6.12 action creatori, joka dispatchaa setNotification ja clearNotification actionit
const createNewNotification = (message, deletedelay = 5) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, deletedelay * 1000)
    }
}

export { createNewNotification } // exportataan action creatori
export const { setNotification, clearNotification } = notificationSlice.actions // nämä on reducerin funktioita
export default notificationSlice.reducer // reducerin exportti
