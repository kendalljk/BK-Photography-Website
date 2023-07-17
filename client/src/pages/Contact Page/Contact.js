import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputMask from "react-input-mask";
import "../Contact Page/Contact.css";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

const Contact = () => {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            date: "",
            message: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Please enter your name.")
                .min(2, "Your name must be at least 2 characters.")
                .max(25, "Your name must be no longer than 25 characters."),
            email: Yup.string()
                .required("Email is required.")
                .email("Invalid email format."),
            phone: Yup.string()
                .required("Phone number is required.")
                .matches(
                    /^\(\d{3}\)-\d{3}-\d{4}$/,
                    "Invalid phone number format."
                ),
            date: Yup.date().required("Please select a date."),
            message: Yup.string()
                .required("Please enter a message.")
                .min(2, "Your message must be at least 2 characters.")
                .max(300, "Please limit your message to 300 characters."),
        }),
        onSubmit: (values) => {
            // Log the data to console for debug
            console.log("Submitting...");

            // Send the form data to the backend API endpoint
            api.post("/contact", values)
                .then((response) => {
                    console.log(response.data); // Log the response from the backend
                    alert(
                        `Thanks for reaching out, ${values.fullName}. You can expect an email response at ${values.email} in 1-2 business days.`
                    );
                    formik.resetForm();
                })
                .catch((error) => {
                    console.error(error); // Log any error that occurred during the API request
                    alert("Failed to submit the form. Please try again later.");
                });
        },
    });

    return (
        <Row className="background">
            <Container id="contact-display">
                <div className="contact-title">
                    <h2>CONTACT</h2>
                    <p>
                        Please reach out about your photo. I’m happy to discuss
                        your project and provide you a quote.
                    </p>
                </div>
                <Form className="form-display" onSubmit={formik.handleSubmit}>
                    <Form.Group className="fullName">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Full Name"
                            name="fullName"
                            id="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                formik.touched.fullName &&
                                !!formik.errors.fullName
                            }
                        />
                        {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="error-text">
                                {formik.errors.fullName}
                            </div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                formik.touched.email && !!formik.errors.email
                            }
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error-text">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="phone">
                        <Form.Label>Phone Number:</Form.Label>
                        <InputMask
                            mask="(999)-999-9999"
                            type="tel"
                            placeholder="(XXX)-XXX-XXXX"
                            name="phone"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {(inputProps) => (
                                <Form.Control
                                    {...inputProps}
                                    isInvalid={
                                        formik.touched.phone &&
                                        !!formik.errors.phone
                                    }
                                />
                            )}
                        </InputMask>
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="error-text">
                                {formik.errors.phone}
                            </div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="date">
                        <Form.Label>Date Requesting:</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            id="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                formik.touched.date && !!formik.errors.date
                            }
                        />
                        {formik.touched.date && formik.errors.date ? (
                            <div className="error-text">
                                {formik.errors.date}
                            </div>
                        ) : null}
                    </Form.Group>
                    <Form.Group className="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Tell me about what you're looking for, any special requests... "
                            name="message"
                            id="message"
                            style={{
                                height: "100px",
                                verticalAlign: "top",
                            }}
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={
                                formik.touched.message &&
                                !!formik.errors.message
                            }
                        />
                        {formik.touched.message && formik.errors.message ? (
                            <div className="error-text">
                                {formik.errors.message}
                            </div>
                        ) : null}
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <button
                            style={{ marginTop: "5%" }}
                            variant="outline-primary"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Container>
        </Row>
    );
};

export default Contact;
