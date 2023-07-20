import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../icons/logo1.png";
import "./Navigation.css"

function Navigation() {
    const location = useLocation();
    const defaultStyle = { color: location.pathname === "/" ? "white" : "black" };
    const activeStyle = { color: "gold", fontWeight: "bold" };

    return (
        <Navbar
            className="navbar"
        >
            <Navbar.Brand
                as="div"
            >
                <Nav.Link
                    as={Link}
                    to="/"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                    />
                </Nav.Link>
            </Navbar.Brand>
            <Nav
                className="mr-auto"
            >
                <Nav.Link
                    as={Link}
                    to="/"
                    style={location.pathname === "/" ? {...defaultStyle, ...activeStyle} : defaultStyle}
                >
                    HOME
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/about"
                    style={location.pathname === "/about" ? {...defaultStyle, ...activeStyle} : defaultStyle}
                >
                    ABOUT
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/galleries"
                    style={location.pathname === "/galleries" ? {...defaultStyle, ...activeStyle} : defaultStyle}
                >
                    GALLERIES
                </Nav.Link>
                <Nav.Link
                    as={Link}
                    to="/contact"
                    style={location.pathname === "/contact" ? {...defaultStyle, ...activeStyle} : defaultStyle}
                >
                    CONTACT
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;