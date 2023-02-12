import PropTypes from 'prop-types'

const LoginForm =  ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (

    <form onSubmit={handleLogin}>

      <h2>Log in to application</h2>
      <div>
                username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>

      <div>
                password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>

      <button type="submit">login</button>
    </form>
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
