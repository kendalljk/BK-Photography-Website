import React, { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import "../Welcome Page/Welcome.css";

const FLICKR_API = "https://api.flickr.com/services/rest/";
const userId = "198700774@N05";

const Welcome = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef();

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(FLICKR_API, {
                params: {
                    method: "flickr.people.getPublicPhotos",
                    api_key: "cd5776663cfef606857d28973a2b3920",
                    user_id: userId,
                    format: "json",
                    nojsoncallback: 1,
                },
            });
            const totalPages = response.data.photos.pages;
            const randomPage = Math.floor(Math.random() * totalPages);
            const photosResponse = await axios.get(FLICKR_API, {
                params: {
                    method: "flickr.people.getPublicPhotos",
                    api_key: "cd5776663cfef606857d28973a2b3920",
                    user_id: userId,
                    format: "json",
                    nojsoncallback: 1,
                    page: randomPage,
                },
            });
            setPhotos(photosResponse.data.photos.photo);
            setCurrentPhotoIndex(
                Math.floor(
                    Math.random() * photosResponse.data.photos.photo.length
                )
            );
            setLoading(false);
        } catch (error) {
            console.error(error);
            // Consider handling errors
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const nextPhoto = () => {
        let newIndex = Math.floor(Math.random() * photos.length);
        if (newIndex === currentPhotoIndex && photos.length > 1) {
            newIndex = (newIndex + 1) % photos.length;
        }
        setCurrentPhotoIndex(newIndex);
    };

    useEffect(() => {
        if (!loading) {
            intervalRef.current = setInterval(nextPhoto, 10000);
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
        <>
            <Row
                className="background-photo"
                style={{
                    backgroundImage: `url(https://live.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_c.jpg)`,
                }}
            >
                <Container className="page-header">
                    <h1 className="web-title">Brian Koch</h1>
                    <h2 className="web-subtitle">
                        Nature and Travel Photographer
                    </h2>
                </Container>
            </Row>
        </>
    );
};

export default Welcome;
