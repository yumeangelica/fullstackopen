import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const NavigationMenu = ({ user, handleLogout }) => { // 7.17 navigaatiomenu
  return (
    <div>
        <Link to="/">blogs</Link> &nbsp;
        <Link to="/users">users</Link> &nbsp;
        {user.name} logged in <Button variant='dark' onClick={handleLogout}>logout</Button>
    </div>
  )
}

export default NavigationMenu