import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Galleries.css"

const Galleries = () => {

    const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

    const FLICKR_API = "https://api.flickr.com/services/rest/";
    const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
    const userId = process.env.USER_ID;

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(FLICKR_API, {
                    params: {
                        method: "flickr.photosets.getList",
                        api_key: FLICKR_API_KEY,
                        user_id: userId,
                        format: "json",
                        nojsoncallback: 1,
                    },
                });

              const albumsData = response.data.photosets.photoset;
              const albumId = response.data.photosets.photoset.id;
              setAlbums(albumsData);
              setLoading(false);
            } catch (error) {
              console.error(error);
            }
          };

          fetchAlbums();
          console.log(albums)
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Row className="g-0 gallery-display">
            <div className="album-grid">
                {albums.map((album) => (
                    <div key={album.id} className="album-item">
                        <img
                            src={`https://live.staticflickr.com/${album.server}/${album.primary}_${album.secret}_c.jpg`}
                            alt={album.title._content}
                        />
                        <Link to={`/galleries/${album.id}`}>
                            <h4 className="album-title">
                                {album.title._content}
                            </h4>
                        </Link>
                    </div>
                ))}
            </div>
        </Row>
    );
};

export default Galleries;
