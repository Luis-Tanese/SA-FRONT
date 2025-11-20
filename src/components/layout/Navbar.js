import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar as NavbarBS, Nav } from "react-bootstrap";

function Navbar() {
    return (
        <NavbarBS bg="dark" variant="dark" expand="lg">
            <Container>
                <NavbarBS.Brand as={Link} to="/">
                    Projeto S.A.
                </NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBS.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    </Nav>
                </NavbarBS.Collapse>
            </Container>
        </NavbarBS>
    );
}

export default Navbar;
