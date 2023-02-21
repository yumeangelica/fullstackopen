import { createContext, useContext, useReducer } from 'react'


const notificationReducer = (state, action) => { // reducer, joka hoitaa contextin tilan
	switch (action.type) { // switch case, joka hoitaa eri actionien tilat
		case 'create': // jos action on create, niin palautetaan actionin payload
			state = action.payload // actionin payload on ilmoitus stringi mikä sisältää anekdootin
			return state // palautetaan state

		case 'clear': // jos action on clear, niin palautetaan tyhjä string
			state = '' // tyhjä stringi
			return state // palautetaan state

		default: // jos action ei ole määritelty, niin palautetaan state
			return state // palautetaan state
	}
}


const NotificationContext = createContext() // luodaan context

const NotificationContextProvider = (props) => { // luodaan contextin provider, joka tarjoaa contextin kaikille lapsikomponenteille
	const [notificationContent, notificationDispatchFunc] = useReducer(notificationReducer, '')

	return ( // palautetaan contextin provider, joka tarjoaa contextin kaikille lapsikomponenteille
		<NotificationContext.Provider value={[notificationContent, notificationDispatchFunc]}>
			{props.children}
		</NotificationContext.Provider>
	)

}


const useNotificationContent = () => { // luodaan funktio, joka palauttaa contextin arvon eli contentin
	const notificationContent = useContext(NotificationContext)
    console.log('notificationContent', notificationContent)
    return notificationContent[0]
}


const useNotificationDispatch = () => { // luodaan funktio, joka palauttaa contextin dispatch funktion
	const notificationDispatchfunc = useContext(NotificationContext) 
	return notificationDispatchfunc[1]
}


export default NotificationContext // exportataan context, jotta sitä voidaan käyttää muualla
export { NotificationContextProvider, useNotificationContent, useNotificationDispatch } // exportataan funktiot