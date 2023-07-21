const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config(); // add this at the top of your index.js to load the variables
const sgMail = require("@sendgrid/mail");
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const userId = process.env.USER_ID;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const app = express();
app.use(bodyParser.json());
app.use(cors());

const contactRouter = require("./routes/contact.router");
app.use(contactRouter);

const port = 3001; // Choose a port number for your backend

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
