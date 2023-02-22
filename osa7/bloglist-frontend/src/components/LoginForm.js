import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <>
            <h2>Log in to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>


                    <Form.Label>Username:</Form.Label>

                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />


                    <Form.Label>Password:</Form.Label>

                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />


                    <Button variant="primary" id="loginsubmit" type="submit">login</Button>
                </Form.Group>
            </Form>
        </>
    )

}
LoginForm.displayName = 'LoginForm' //LoginForm komponentin nimi

LoginForm.propTypes = { //ottaa kiinni LoginForm komponentista ja määrittelee sen PropTypet ennen exporttaustausta
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}





export default LoginForm
