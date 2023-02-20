import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification) // haetaan storesta notification

    const style = { // notificationin tyylit
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        display: notification === '' ? 'none' : 'block', // jos notification on tyhjä, niin piilotetaan se
        backgroundColor: 'lightgreen'
    }

    return (
        <div style={style}>
            {notification} {/* notificationin sisältö */}
        </div>
    )
}

export default Notification