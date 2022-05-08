import React, {FC, useContext} from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import {TokenContext} from "../../App";
import {getClaimFromToken} from "../../helpers/token-helper";
import {useNavigate} from "react-router-dom";

interface NavbarProps {
}

const MyNavbar: FC<NavbarProps> = () => {
    const {token, setToken} = useContext(TokenContext);
    const navigate = useNavigate()

    const logout = () => {
        setToken('')
        localStorage.removeItem("jwtToken")
        navigate('/')
    };

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
        const email = getClaimFromToken(token, 'email');

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
            <Container fluid>
                <Navbar.Brand>Task Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="col-12">
                        <Nav.Item className="me-auto d-lg-flex">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/tasks">
                                <Nav.Link>My Tasks</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/tasks/create">
                                <Nav.Link>Add Task</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="d-lg-flex">
                            {token ? getUserDropdown() : getAuthLinks()}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;