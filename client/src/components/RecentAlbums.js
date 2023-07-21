import "./RecentAlbums.css"
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";

const RecentAlbums = () => {
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
                sort: "date_create",
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
              <a href={`https://www.flickr.com/photos/${userId}/albums/${album.id}`} className="link">
                <h4 className="album-title">{album.title._content}</h4>
              </a>
          </div>
        ))}
      </div>
      </section>
    </Row>
  );
}



export default RecentAlbums;
