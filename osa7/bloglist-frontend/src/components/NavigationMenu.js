import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const navLinkStyle = {
    fontSize: 20,
}


const NavigationMenu = ({ user, handleLogout }) => { // 7.17 navigaatiomenu, styled and responsive with bootstrap
    return (

        <Navbar style={navLinkStyle} collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link to="/">blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link to="/users">users</Link>
                    </Nav.Link>
                    <NavDropdown title={user.name} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#" as="span">
                            <span onClick={handleLogout}>logout</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavigationMenu