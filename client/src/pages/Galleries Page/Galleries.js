import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Galleries.css";
import useFetchFlickr from "../../hooks/useFetchFlickr";

const Galleries = () => {
 const { data: albums, loading } = useFetchFlickr("/flickr/albums");


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
