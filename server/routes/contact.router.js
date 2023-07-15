const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");


/*sgMail.setApiKey(
    "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"
);*/


router.post("/contact", (req, res) => {
    // Access the submitted form data
    const { fullName, email, message, phone } = req.body;

    // Compose the email message
    const msg = {
        to: "kendalljunekoch@gmail.com", // Replace with the actual recipient's email address
        from: email, // Replace with your verified sender's email address
        subject: "Contact Form Submission",
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Sends the email
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent successfully");
            res.json({ success: true });
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            res.status(500).json({
                success: false,
                error: "Failed to send email",
            });
        });
});

module.exports = router;
