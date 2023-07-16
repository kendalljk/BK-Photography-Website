import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Welcome from "../pages/Welcome Page/Welcome";
import About from "../pages/About Page/About";
import Contact from "../pages/Contact Page/Contact";
import logo from "../icons/BKlogo.png";

function Navigation() {
    return (
        <Router>
            <Navbar bg="light">
                <Navbar.Brand style={{ paddingLeft: "5%" }} as="h1">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo"
                        style={{
                            width: "2.5rem",
                            height: "auto",
                            paddingRight: "5%",
                        }}
                    />
                    Brian Koch Photography
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">
                        Welcome
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about">
                        About
                    </Nav.Link>
                    <Nav.Link as={Link} to="/contact">
                        Contact
                    </Nav.Link>
                </Nav>
            </Navbar>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Welcome />} />
            </Routes>
        </Router>
    );
}

export default Navigation;
