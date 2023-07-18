import React from "react";
import { Row } from "react-bootstrap";

const Footer = () => {
    return (
        <Row>
            <diV>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Portfolio</li>
                    <li>Contact</li>
                </ul>
                <div>
                    <h4>Facebook</h4>
                    <h4>Flickr</h4>
                </div>
                <a href="briankochphotography">BrianKochPhotography</a>
                <em>
                    Photos and text Copyright Brian Koch. Contents cannot be
                    used in any way without written permission from Brian Koch
                    Photography. All rights reserved.
                </em>
            </diV>
        </Row>
    );
};

export default Footer;
