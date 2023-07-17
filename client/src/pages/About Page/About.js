import React from "react";
import { Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import profilePhoto from "../../icons/BrianKoch.png";
import "../About Page/About.css";

const About = () => {
    return (
        <Row className="background">
            <Container id="about-display">
                <Image
                    id="photographer-photo"
                    fluid={true}
                    src={profilePhoto}
                    alt="photographer photo"
                />
                <div className="photographer-bio">
                <h2 className="about-header">ABOUT</h2>
                    <p>
                        Brian Koch is a professional photographer known for his
                        captivating images of landscapes and wildlife spanning
                        across America, Africa, Asia, and Europe. His
                        photography transports viewers to stunning locations and
                        allows them to connect with the natural world.
                    </p>
                    <p>
                        With a keen eye for composition and a deep appreciation
                        for nature, Brian captures the beauty and diversity of
                        settings across continents and showcases the unique
                        character of each place. His photographs serve as a
                        visual exploration of our planet's rich natural and
                        cultural heritage.
                    </p>
                    <p>
                        Brian's love for wildlife is evident in his images,which
                        depict animals in their natural habitats. With a passion
                        for photography and a commitment to capturing the
                        essence of landscapes and wildlife, his work invites us
                        to appreciate the beauty and interconnectedness of our
                        global environment.
                    </p>
                </div>
            </Container>
        </Row>
    );
};

export default About;
