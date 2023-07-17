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
                justifyContent: "space-between",
                background: "transparent",
                position: "absolute",
                width: "100%",
            }}
        >
            <Navbar.Brand as="div">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                        style={{
                            width: "2.5rem",
                            height: "auto",
                            paddingLeft: "5%",
                        }}
                    />
                    <h1
                        id="title"
                        style={{
                            display: "inline",
                            paddingLeft: "15%",
                            letterSpacing: "2px",
                            textShadow: "1px 1px white",
                            color: "black",
                        }}
                    >
                        BRIAN KOCH
                    </h1>
                </Link>
            </Navbar.Brand>
            <Nav
                className="mr-auto"
                style={{
                    paddingRight: "5%",
                    color: "black",
                  fontSize: "larger",
                    fontWeight: "normal"
                }}
            >
                <Nav.Link as={Link} to="/about">
                    About
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                    Contact
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
