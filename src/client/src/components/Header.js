import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function logout(e) {
    console.log("inside logout function")
    if(e)
        e.preventDefault()
    localStorage.removeItem("token");
    window.location.replace('/')
}

const Header = () => {
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#">C H A T H U R A M</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        { localStorage.getItem("token") && <Nav.Link onClick={logout}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export {
    logout,
    Header,
}
