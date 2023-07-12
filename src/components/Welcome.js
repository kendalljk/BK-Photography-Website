import React, { useState, useEffect, useRef } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import axios from "axios";
const FLICKR_API = "https://api.flickr.com/services/rest/";
const userId = "198700774@N05";

const Welcome = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef();

    useEffect(() => {
        const fetchTotalPages = async () => {
            try {
                const response = await axios.get(FLICKR_API, {
                    params: {
                        method: "flickr.people.getPublicPhotos",
                        api_key: "cd5776663cfef606857d28973a2b3920",
                        user_id: userId,
                        format: "json",
                        nojsoncallback: 1,
                    },
                });
                console.log(response.data);
                setTotalPages(response.data.photos.pages);
            } catch (error) {
                console.error(error);
                // Consider handling errors
            }
        };
        fetchTotalPages();
    }, []);

    const fetchPhotos = async () => {
        try {
            const randomPage = Math.floor(Math.random() * totalPages);
            const response = await axios.get(FLICKR_API, {
                params: {
                    method: "flickr.people.getPublicPhotos",
                    api_key: "cd5776663cfef606857d28973a2b3920",
                    user_id: userId,
                    format: "json",
                    nojsoncallback: 1,
                    page: randomPage,
                },
            });
            console.log(response.data);
            setPhotos(response.data.photos.photo);
            setCurrentPhotoIndex(
                Math.floor(Math.random() * response.data.photos.photo.length)
            );
            setLoading(false);
        } catch (error) {
            console.error(error);
            // Consider handling errors
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [totalPages]);

    const nextPhoto = () => {
        let newIndex = Math.floor(Math.random() * photos.length);
        if (newIndex === currentPhotoIndex && photos.length > 1) {
            newIndex = (newIndex + 1) % photos.length;
        }
        setCurrentPhotoIndex(newIndex);
    };

    useEffect(() => {
        if (!loading) {
            intervalRef.current = setInterval(nextPhoto, 5000);
            return () => {
                clearInterval(intervalRef.current);
            };
        }
    }, [photos, currentPhotoIndex, loading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const currentPhoto = photos[currentPhotoIndex];

    return (
        <Row
            className="justify-content-center"
            style={{
                minHeight: "100vh",
            }}
        >
            <Container
                style={{
                    background: "black",
                    marginTop: "5%",
                    height: "70vh",
                    width: "60%",
                }}
            >
                <Image
                    className="slide-left"
                    fluid={true}
                    key={currentPhoto.id}
                    src={`https://live.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_c.jpg`}
                    id="photo-carousel"
                    alt="photo-carousel"
                    style={{
                        display: "block",
                        margin: "auto",
                        maxWidth: "80%",
                        height: "100%",
                    }}
                />
            </Container>
        </Row>
    );
};

export default Welcome;
