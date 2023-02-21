import { useNotificationContent } from "../NotificationContext"

const Notification = () => {

    const notificationContent = useNotificationContent() // haetaan notificationin contentti contextista
   
    const style = { // style objecti, joka määrittelee notificationin tyylit
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: 'lightgreen'
    }

    const errorStyle = { // style objecti, joka määrittelee notificationin tyylit error tilanteessa
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: 'red'
    }


    if (notificationContent === "" || notificationContent === undefined) { // jos notificationContent on tyhjä, niin palautetaan null
        return null
    }

    return ( // palautetaan notificationin contentti
        
        <div style={notificationContent.includes('too short anecdote, must have length 5 or more') ? errorStyle : style}> {/* jos notificationin contentti sisältää virheilmoituksen, niin näytetään errorStyle, muuten style */}
            {notificationContent} {/* näytetään notificationin contentti */}
        </div>
        

    )
}

export default Notification
