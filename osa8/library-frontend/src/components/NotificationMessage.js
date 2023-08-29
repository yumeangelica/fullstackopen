const NotificationMessage = ({ notificationMessage }) => {

    if (!notificationMessage) { // if there is no notificationMessage
        return null
    }

    return (
        <div>
            {notificationMessage}
        </div>
    )
}


export default NotificationMessage