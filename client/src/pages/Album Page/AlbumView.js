import React from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import "./AlbumView.css";
import useFetchFlickr from "../../hooks/useFetchFlickr";

const AlbumView = () => {
    const { albumId } = useParams(); // Access albumId from dynamic URL
const { data: photos, loading } = useFetchFlickr(`/flickr/photos/${albumId}`);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Row className="album-display">
            <div className="photo-grid">
                {photos.map((photo) => (
                    <img
                        key={photo.id}
                        className="album-photo"
                        src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                        alt={photo.title}
                    />
                ))}
            </div>
        </Row>
    );
};

export default AlbumView;
