import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Row } from 'react-bootstrap';
import axios from 'axios';
import "./AlbumView.css";


const AlbumView = () => {
    const { albumId } = useParams(); // Using useParams hook to access URL parameters
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    const FLICKR_API = process.env.FLICKR_API;
    const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
    const userId = process.env.USER_ID;

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(
                    FLICKR_API,
                    {
                        params: {
                            method: "flickr.photosets.getPhotos",
                            api_key: FLICKR_API_KEY,
                            user_id: userId,
                            photoset_id: albumId, // pass the albumId to the API call
                            format: "json",
                            nojsoncallback: 1,
                        },
                    }
                );

                const photosData = response.data.photoset.photo;
                setPhotos(photosData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, [albumId]); // Dependency array contains albumId.
    // This means the effect runs whenever albumId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <Row className="album-display">
        <div className='photo-grid'>
            {photos.map((photo) => (
                <img
                key={photo.id}
                className='album-photo'
                    src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                    alt={photo.title}
                />
                ))}
        </div>
        </Row>
    );
};

export default AlbumView