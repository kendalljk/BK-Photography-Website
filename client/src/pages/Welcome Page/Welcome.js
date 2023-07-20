import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Image } from "react-bootstrap";
import axios from "axios";
import "../Welcome Page/Welcome.css";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import AlbumsDisplay from "../../components/RecentAlbums";

const FLICKR_API = "https://api.flickr.com/services/rest/";
const userId = "198700774@N05"; //put in env
const FLICKR_API_KEY = "cd5776663cfef606857d28973a2b3920"; // put in env

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
                    api_key: FLICKR_API_KEY,
                    user_id: userId,
                    format: "json",
                    nojsoncallback: 1,
                },
            });

            console.log("response", response);
            const totalPages = response.data.photos.pages;
            const randomPage = Math.floor(Math.random() * totalPages) + 1;

            const photosResponse = await axios.get(FLICKR_API, {
                params: {
                    method: "flickr.people.getPublicPhotos",
                    api_key: FLICKR_API_KEY,
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
        intervalRef.current = setInterval(nextPhoto, 10000);
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [photos, currentPhotoIndex]);

    const currentPhoto = photos[currentPhotoIndex];
    console.log(currentPhoto);

    if (loading) {
        return <div></div>;
    }

    return (
        <main className="welcome-page">
            <Row className="g-0 m-0">
                <img
                    className="figure-photo"
                    src={`https://live.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_b.jpg`}
                    alt="BK images carousel"
                />
            </Row>
            <section className="welcome-display">
                <Header />
                <Banner />
                <AlbumsDisplay />
            </section>
        </main>
    );
};

export default Welcome;
