import React from "react";

const Header = () => {
    return (
        <header
            className="mb-0"
            style={{
                padding: "2% 0",
                backgroundColor: "rgba(246, 244, 241, .9)",
            }}
        >
            <p
                style={{
                    borderTop: "3px solid silver",
                    fontSize: "1.5rem",
                    padding: "2%",
                    margin: "0",
                    letterSpacing: "1rem",
                }}
            >
                WELCOME TO
            </p>
            <h1
                className="my-0"
                style={{
                    borderBottom: "3px solid silver",
                    paddingBottom: "5%",
                }}
            >
                BRIAN KOCH PHOTOGRAPHY
        </h1>
        </header>
    );
};

export default Header;
