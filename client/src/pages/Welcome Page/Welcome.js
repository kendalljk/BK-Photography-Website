import React, { useState, useEffect, useRef } from "react";
import { Row, } from "react-bootstrap";
import "../Welcome Page/Welcome.css";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import AlbumsDisplay from "../../components/RecentAlbums";
import useFetchFlickr from "../../hooks/useFetchFlickr";

const Welcome = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const intervalRef = useRef();

  const {
      data: photos,
      loading,
      error,
  } = useFetchFlickr("/flickr/photos/backgrounds");


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
        return <div>Loading...</div>;
  }

      if (error) {
          return <div>Error: {error}</div>;
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
