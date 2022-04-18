import React, {FC} from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import {logout} from "../../helpers/logout";

interface NavbarProps {
}

const MyNavbar: FC<NavbarProps> = () => {
    const token = localStorage.getItem("token");
    const email = token ? JSON.parse(atob(token.split('.')[1])).email : null;

    const getAuthLinks = () => {
        return (
            <>
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                </LinkContainer>
            </>
        )
    }

    const getUserDropdown = () => {
        return (
            <NavDropdown title={email} align={"end"}>
                <LinkContainer to="/account">
                    <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="mb-5">
            <Container fluid={true}>
                <Navbar.Brand>Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/tasks/user/all">
                            <Nav.Link>My Tasks</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/tasks/create">
                            <Nav.Link>Add Task</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {token ? getUserDropdown() : getAuthLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
