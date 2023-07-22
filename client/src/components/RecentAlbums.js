import "./RecentAlbums.css"
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";

const RecentAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = process.env.REACT_APP_USER_ID; // Use an environment variable for userId

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get("/flickr/recent");
                setAlbums(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Row className="recent-display g-0">
            <h2>RECENT WORK</h2>
            <section className="recent-grid">
                <div className="recent-grid">
                    {albums.map((album) => (
                        <div key={album.id} className="recent-item">
                            <img
                                src={`https://live.staticflickr.com/${album.server}/${album.primary}_${album.secret}_b.jpg`}
                                alt={album.title._content}
                            />
                            <a
                                href={`https://www.flickr.com/photos/${userId}/albums/${album.id}`}
                                className="link"
                            >
                                <h4 className="album-title">
                                    {album.title._content}
                                </h4>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </Row>
    );
}



export default RecentAlbums;
