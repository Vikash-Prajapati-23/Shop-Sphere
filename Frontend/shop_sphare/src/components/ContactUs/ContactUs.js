import React, { useContext, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Style/ContactUs.css";
import { themeContext } from "../../App";

const ContactUs = () => {
  const form = useRef();
  const toggleMode = useContext(themeContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_4u1tybz", "template_ft26u5d", form.current, {
        publicKey: "g1hq_pQ8P2FLCdEpR",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div style={{ backgroundColor: toggleMode.mode === true ? "#121212" : "#EAECED" }} className="my-4 mx-5">
      <h4 style={{ color: toggleMode.mode === true ? "#fff" : "black" }} className="text-center mt-1 cont-title fw-bold">Shop Sphare</h4>
      <h1 style={{ color: toggleMode.mode === true ? "#fff" : "black" }} className="text-center my-3 fw-bold">Contact Us</h1>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.61577313882!2d88.37139257507376!3d22.443483079583864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271c7c0372afb%3A0xdd2f223767c26a2!2sFuture%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1729374654406!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="cont-item row container-fluid mt-3">
        <form
          className="con-item-right col-md-6 my-2"
          ref={form}
          onSubmit={sendEmail}
        >
          <div className="row">
            <div className="col-10 mb-3">
              <p className="form-title mb-1">Name</p>
              <input
                placeholder="Full name"
                className="form-control mb-2"
                type="text"
                name="from_name"
              />
            </div>

            <div className="col-10 mb-3">
              <p className="form-title mb-1">Phone Number</p>
              <input
                type="text"
                id="phone"
                className="form-control mb-2"
                placeholder="Enter your phone number"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>

            <div className="col-10 mb-3">
              <p className="form-title mb-1">Email</p>
              <input
                placeholder="Email"
                className="form-control mb-2"
                type="email"
                name="to_name"
              />
            </div>

            <div className="col-10 mb-3">
              <p className="form-title mb-1">Feedback</p>
              <textarea
                placeholder="Enter your message!"
                className="form-control mb-2"
                name="message"
              />
            </div>

            <div className="col-10 mb-3">
              <input
                className="form-control mb-2 btn btn-success"
                type="submit"
                value="Send"
              />
            </div>
          </div>
        </form>

        <div style={{ color: toggleMode.mode === true ? "#fff" : "black" }} className="con-item-left col-md-6 my-2 text-center">
          <div className="contact-foot foot-items mt-5">
            <h4>Reach Us</h4>
            <p>Shop Sphare PVT LTD</p>
            <p>IIT boral, Future Institute Of Technology</p>
            <p>1234567890, 5522883366</p>
          </div>

          <div className="contact-foot foot-items mt-5">
            <h4>Social</h4>
            <i className="fa-brands fa-facebook foot-icons"></i>
            <i className="fa-brands fa-facebook-messenger foot-icons"></i>
            <i className="fa-brands fa-square-instagram foot-icons"></i>
            <i className="fa-brands fa-square-threads foot-icons"></i>
            <i className="fa-brands fa-youtube foot-icons"></i>
            <i className="fa-brands fa-twitter foot-icons"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
