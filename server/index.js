const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3001; // Choose a port number for your backend

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
