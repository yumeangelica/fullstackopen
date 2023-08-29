import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

import NotificationMessage from './NotificationMessage' // 8.18 import the notification message component


const LoginForm = ({ show, setToken, setPage }) => {

    const [notificationMessage, setNotificationMessage] = useState(null) // 8.18 create a notification message state variable
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, loginResult] = useMutation(LOGIN) // 8.18 use the useMutation hook to send the mutation to the server

    const handleLoginSubmit = async (event) => { // 8.18 create a function for handling the form submit
        event.preventDefault() // 8.18 prevent the default action of the form
        console.log('loginResult', loginResult)
        
        try {
            const result = await login({ variables: { username, password } }) // 8.18 call the login mutation here with the parsed integer value
            console.log(result)
            console.log('logging in...')
            
            if (result.data) { // 8.18 if the login was successful,
                const token = result.data.login.value // 8.18 save the token to the token state variable
                setToken(token) // 8.18 call the setToken function with the token
                localStorage.setItem('library-user-token', token) // 8.18 save the token to local storage
                console.log('user logged in')
                setNotificationMessage('Login successful') // set the notification message to 'Login successful'
                setPage('authors')
                
            } 
            setTimeout(() => { // set a timeout for 5 seconds
                setNotificationMessage(null) // set the notification message to null
            }, 5000)

    
    
            console.log('result.data', result.data)
    
            setUsername('') // 8.18 reset the username state variable
            setPassword('') // 8.18 reset the password state variable
        
        } catch (error) {
            console.log('error', error.message)
            setNotificationMessage(`Login failed: ${error.message}`) // set the notification message to 'Login failed'
        }
        setTimeout(() => { // set a timeout for 5 seconds
            setNotificationMessage(null) // 8.18 set the notification message to null
        }, 5000)

    }


    if (!show) { // 8.18 if the show prop is false,
        return null
    }

    return (
        <>

            <NotificationMessage notificationMessage = {notificationMessage} /> {/* add the notification message component */}

            <form onSubmit={handleLoginSubmit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </>
    )
}


export default LoginForm