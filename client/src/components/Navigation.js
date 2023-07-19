import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../icons/BKlogo.png";

function Navigation() {
    return (
        <Navbar
            className="navbar"
            style={{
                display: "flex",
                background: "#0E0F19",
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            <Navbar.Brand
                as="div"
                style={{
                    width: "50%",
                }}
            >
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "white",
                        width: "100%",
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                        style={{
                            width: "3rem",
                            height: "auto",
                            paddingLeft: "5%",
                        }}
                    />
                </Link>
            </Navbar.Brand>
            <Nav
                className="mr-auto"
                style={{
                    paddingRight: "5%",
                    color: "black",
                    fontSize: "larger",
                    fontWeight: "normal",
                    width: "auto",
                }}
            >
                <Nav.Link as={Link} to="/about">
                    About
                </Nav.Link>
                <Nav.Link as={Link} to="/portfolio">
                    Portfolio
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                    Contact
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
