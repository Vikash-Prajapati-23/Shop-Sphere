import React, { useContext, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Style/ContactUs.css";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_4u1tybz", "template_ft26u5d", form.current, {
        publicKey: "g1hq_pQ8P2FLCdEpR",
      })
      .then(
        () => {
          if (process.env.REACT_APP_NODE_ENV !== "production") {
            console.log("Success");
          }
        },
        (error) => {
          if (process.env.REACT_APP_NODE_ENV !== "production") {
            console.error(error);
          }
        }
      );
  };

  return (
    <div className="my-md-4 my-3 mx-md-5 mx-4 bg-white">
      <h4 className="text-center text-primary pt-3 cont-title fw-semibold">
        Shop Sphare
      </h4>
      <h2 className="text-center my-3 fw-bold cont-us-title-">Contact Us</h2>

      <iframe
        className="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.61577313882!2d88.37139257507376!3d22.443483079583864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271c7c0372afb%3A0xdd2f223767c26a2!2sFuture%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1729374654406!5m2!1sen!2sin"
        allowFullScreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="cont-item mt-3">
        <form className="con-item-right my-2" ref={form} onSubmit={sendEmail}>
          <div className="">
            <div className="mb-3">
              <p className="form-title mb-1 contact-text-size-b">Name</p>
              <input
                placeholder="Full name"
                className="form-control mb-2 ms-md-1 contact-text-size-s"
                type="text"
                name="from_name"
              />
            </div>

            <div className="mb-3 contact-text-size-b">
              <p className="form-title mb-1">Phone Number</p>
              <input
                type="text"
                id="phone"
                className="form-control mb-2 ms-md-1 contact-text-size-s"
                placeholder="Enter your phone number"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>

            <div className="mb-3 contact-text-size-b">
              <p className="form-title mb-1">Email</p>
              <input
                placeholder="Email"
                className="form-control mb-2 ms-md-1 contact-text-size-s"
                type="email"
                name="to_name"
              />
            </div>

            <div className="mb-3">
              <p className="form-title mb-1 contact-text-size-b">Feedback</p>
              <textarea
                placeholder="Enter your message!"
                className="form-control mb-2 ms-md-1 contact-text-size-s"
                name="message"
              />
            </div>

            <div className="mb-3">
              <button
                className="form-control mb-2 btn btn-success contact-text-size-b"
                type="submit"
                value="Send"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        <div className="con-item-left">
          <h4 className="">Reach Us</h4>
          <div className="contact-foot foot-items contact-text-size-b">
            <p>Shop Sphare PVT LTD</p>
            <p>IIT boral, Future Institute Of Technology</p>
            <p>1234567890, 5522883366</p>
          </div>

          <div className="contact-foot-social foot-items mt-md-5 mt-3">
            <h4 className="">Social</h4>
            <i className="fa-brands fa-facebook foot-icons contact-text-size-b"></i>
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
