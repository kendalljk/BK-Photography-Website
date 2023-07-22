const express = require("express");
const axios = require("axios");
const router = express.Router();

const FLICKR_API = "https://api.flickr.com/services/rest/";
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const userId = process.env.REACT_APP_USER_ID;

// Fetch photos from Flickr API
router.get("/photos/:albumName", async (req, res) => {
    const albumName = req.params.albumName;


    try {

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
        const targetAlbum = albumList.find(
            (album) => album.title._content === albumName
        );

        if (!targetAlbum) {
            res.status(404).json({ message: `${albumName} album not found.` });
            return;
        }

        const targetAlbumId = targetAlbum.id;

        // Fetch photos from target album
        const photosResponse = await axios.get(FLICKR_API, {
            params: {
                method: "flickr.photosets.getPhotos",
                api_key: FLICKR_API_KEY,
                user_id: userId,
                format: "json",
                nojsoncallback: 1,
                photoset_id: targetAlbumId,
            },
        });
        console.log(photosResponse.data); // for debugging

        res.json(photosResponse.data.photoset.photo);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Get list of albums from Flickr
router.get("/albums", async (req, res) => {
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

        res.json(response.data.photosets.photoset);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get("/recent", async (req, res) => {
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
        res.json(albumsData);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
