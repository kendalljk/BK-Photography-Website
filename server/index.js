const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // loads the variables from env
const sgMail = require("@sendgrid/mail");
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const userId = process.env.USER_ID;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Import flickr router
const flickrRouter = require("./routes/flickr.router");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use flickr router
app.use("/flickr", flickrRouter);

const contactRouter = require("./routes/contact.router");
app.use(contactRouter);

const port = 3001;

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
