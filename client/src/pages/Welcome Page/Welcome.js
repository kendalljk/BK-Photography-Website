import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Image } from "react-bootstrap";
import axios from "axios";
import "../Welcome Page/Welcome.css";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import AlbumsDisplay from "../../components/RecentAlbums";

const Welcome = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const intervalRef = useRef();

  const FLICKR_API = "https://api.flickr.com/services/rest/";
  const FLICKR_API_KEY = process.env.NEXT_PUBLIC_FLICKR_API_KEY;
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  const fetchPhotos = async () => {
    try {
      setLoading(true);

      console.log(FLICKR_API_KEY)
      console.log(userId)
            // Get the album ID for the "backgrounds" album
            const albumResponse = await axios.get(FLICKR_API, {
                params: {
                    method: "flickr.photosets.getList",
                    api_key: FLICKR_API_KEY,
                    user_id: userId,
                    format: "json",
                    nojsoncallback: 1,
                },
            });

            const albumList = albumResponse.data.photosets.photoset;
            const backgroundsAlbum = albumList.find(
                (album) => album.title._content === "backgrounds"
            );

            if (!backgroundsAlbum) {
                console.log("Backgrounds album not found.");
                setLoading(false);
                return;
            }

            const backgroundsAlbumId = backgroundsAlbum.id;

            // Fetch photos from the "backgrounds" album
            const photosResponse = await axios.get(FLICKR_API, {
                params: {
                    method: "flickr.photosets.getPhotos",
                    api_key: FLICKR_API_KEY,
                    user_id: userId,
                    format: "json",
                    nojsoncallback: 1,
                    photoset_id: backgroundsAlbumId,
                },
            });

            setPhotos(photosResponse.data.photoset.photo);
            setCurrentPhotoIndex(
                Math.floor(
                    Math.random() * photosResponse.data.photoset.photo.length
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
