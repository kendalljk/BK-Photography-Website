import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BKphotography from "../icons/BKphotography.png";

const Banner = () => {
    return (
        <Row
            className="banner-display g-0"
            style={{
                backgroundColor: " rgb(239, 235, 228)",
              width: "100%",
                padding: "5% 0",
                margin: "auto",
            }}
        >
            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        margin: "5%",
                        width: "50%",
                    }}
                >
                    <img
                        src={BKphotography}
                        alt="Brian Koch Photography"
                        style={{
                            width: "40%",
                        }}
                    />
                    <h6>Travel, Nature, and Wildlife Photographer</h6>
                </div>
                <div
                    style={{
                        paddingRight: "10%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <p>
                        Brian Koch is renowned for his captivating images
                        spanning continents. With a keen eye for detail and a
                        passion for exploration, he captures diverse subjects,
                        from stunning landscapes to mesmerizing wildlife
                        encounters. Through his lens, the viewer is able to
                        experience the beauty of our planet and cultivate a
                        profound appreciation for the wonders of nature.
                    </p>
                    <span
                        style={{
                            width: "auto",
                            display: "flex",
                            textDecoration: "none",
                            background: "none",
                            border: "none",
                            justifyContent: "flex-end",
                            textAlign: "right",
                        }}
                    >
                        <Link to="/about">Learn More...</Link>
                    </span>
                </div>
            </section>
        </Row>
    );
};

export default Banner;
