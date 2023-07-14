const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/contact", (req, res) => {
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
