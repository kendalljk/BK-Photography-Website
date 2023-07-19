import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import "./AlbumsDisplay.css"

const AlbumsDisplay = () => {
  const FLICKR_API = "https://api.flickr.com/services/rest/";
  const userId = "198700774@N05"; // Put your user ID here or use an environment variable
  const FLICKR_API_KEY = "cd5776663cfef606857d28973a2b3920"; // Put your API key here or use an environment variable

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setAlbums(albumsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, [FLICKR_API, FLICKR_API_KEY, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row className="g-0 album-display">
      <div className="album-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-item">
            <img
              src={`https://live.staticflickr.com/${album.server}/${album.primary}_${album.secret}_q.jpg`}
              alt={album.title._content}
            />
              <a href={`https://www.flickr.com/photos/${userId}/albums/${album.id}`}>
                <h4>{album.title._content}</h4>
              </a>
          </div>
        ))}
      </div>
    </Row>
  );
}



export default AlbumsDisplay;
