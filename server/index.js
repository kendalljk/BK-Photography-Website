const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
    "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"
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const contactRouter = require("./routes/contact.router");
app.use(contactRouter);

const port = 3001; // Choose a port number for your backend

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
