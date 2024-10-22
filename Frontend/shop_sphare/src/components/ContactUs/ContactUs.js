// import React,{useState} from "react";
// import "./Style/ContactUs.css";

// const FeedbackForm = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   // Dynamically load SMTP.js
//   const loadSmtpJs = () => {
//     const script = document.createElement('script');
//     script.src = 'https://smtpjs.com/v3/smtp.js';
//     script.async = true;
//     document.body.appendChild(script);
//   };

//   // Call loadSmtpJs when the component mounts
//   React.useEffect(() => {
//     loadSmtpJs();
//   }, []);

//   const sendMail = (e) => {
//     e.preventDefault();
    
//     if (window.Email) {
//       window.Email.send({
//         Host: "smtp.elasticemail.com",
//         Username: "username", // Replace with your SMTP username
//         Password: "password", // Replace with your SMTP password
//         To: "them@website.com", // Replace with the recipient email
//         From: email,
//         Subject: "This is the subject",
//         Body: message,
//       }).then((msg) => alert(`Mail sent: ${msg}`))
//         .catch((error) => alert(`Failed to send email: ${error}`));
//     } else {
//       alert('SMTP.js not loaded yet!');
//     }
//   };

// const ContactUs = () => {

//   return (
//     <div className="my-4 mx-5">
//       <h4 className="text-center mt-1 cont-title">Shop Sphare</h4>
//       <h1 className="text-center my-3">Contact Us</h1>

//       <iframe
//         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.61577313882!2d88.37139257507376!3d22.443483079583864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271c7c0372afb%3A0xdd2f223767c26a2!2sFuture%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1729374654406!5m2!1sen!2sin"
//         width="100%"
//         height="350"
//         style={{ border: 0 }}
//         allowFullScreen=""
//         loading="lazy"
//         referrerpolicy="no-referrer-when-downgrade"
//       ></iframe>

//       <div className="cont-item row container-fluid mt-3">
//         <div className="con-item-right col-md-6 my-2">
//           <div className="row">
//             <div className="col-10 mb-3">
//               {/* <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span> */}
//               <p className="form-title mb-1">Name</p>
//               <input
//                 type="text"
//                 id="name"
//                 className="form-control"
//                 placeholder="Enter your full name"
//                 aria-label="Example text with button addon"
//                 aria-describedby="button-addon1"
//               />
//             </div>

//             <div className="col-10 mb-3">
//               {/* <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-phone"></i></span> */}
//               <p className="form-title mb-1">Phone Number</p>
//               <input
//                 type="text"
//                 id="phone"
//                 className="form-control"
//                 placeholder="Enter your phone number"
//                 aria-label="Example text with button addon"
//                 aria-describedby="button-addon1"
//               />
//             </div>

//             <div className=" col-10 mb-3">
//               <p className="form-title mb-1">Email</p>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control mb-2"
//                 placeholder="Enter your email!"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <p className="form-title mb-1">Feedback</p>
//               <textarea
//                 id="feedback"
//                 className="form-control mb-2"
//                 placeholder="Enter your message!"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 required
//               ></textarea>
//               <div className="btn">
//                 <button type="submit" class="btn btn-success">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="con-item-left col-md-6 my-2 text-center">
//           <div className="contact-foot foot-items mt-5">
//             <h4>Reach Us</h4>
//             <p>Shop Sphare PVT LTD</p>
//             <p>IIT boral, Future Institute Of Techonology</p>
//             <p>1234567890, 5522883366</p>
//           </div>

//           <div className="contact-foot foot-items mt-5">
//             <h4>Social</h4>
//             <i className="fa-brands fa-facebook foot-icons"></i>
//             <i className="fa-brands fa-facebook-messenger foot-icons"></i>
//             <i className="fa-brands fa-square-instagram foot-icons"></i>
//             <i className="fa-brands fa-square-threads foot-icons"></i>
//             <i className="fa-brands fa-youtube foot-icons"></i>
//             <i className="fa-brands fa-twitter foot-icons"></i>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;



import React, { useState } from "react";
import "./Style/ContactUs.css";

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Dynamically load SMTP.js
  const loadSmtpJs = () => {
    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.async = true;
    document.body.appendChild(script);
  };

  // Call loadSmtpJs when the component mounts
  React.useEffect(() => {
    loadSmtpJs();
  }, []);

  const sendMail = (e) => {
    e.preventDefault();
  
    // Ensure you replace the credentials with those from your Elastic Email account
    if (window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "vikash.kr.prajapati.fit.cse21@teamfuture.in", // Your Elastic Email username
        Password: "6290FAAC89805162B383FFA5E35559AF01BD", // Your Elastic Email password or API key
        To: document.getElementById("email").value, // Replace with the recipient email
        From: email,
        Subject: "This is the subject",
        Body: message,
      }).then((msg) => alert(`Mail sent: ${msg}`))
        .catch((error) => alert(`Failed to send email: ${error}`));
    } else {
      alert('SMTP.js not loaded yet!');
    }
  };

  // 6290FAAC89805162B383FFA5E35559AF01BD
//   Server
// smtp.elasticemail.com
// Port
// 2525

  return (
    <div className="my-4 mx-5">
      <h4 className="text-center mt-1 cont-title">Shop Sphare</h4>
      <h1 className="text-center my-3">Contact Us</h1>

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
        <div className="con-item-right col-md-6 my-2">
          <div className="row">
            <div className="col-10 mb-3">
              <p className="form-title mb-1">Name</p>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>

            <div className="col-10 mb-3">
              <p className="form-title mb-1">Phone Number</p>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>

            <div className="col-10 mb-3">
              <p className="form-title mb-1">Email</p>
              <input
                type="email"
                id="email"
                className="form-control mb-2"
                placeholder="Enter your email!"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-10 mb-3">
              <p className="form-title mb-1">Feedback</p>
              <textarea
                id="feedback"
                className="form-control mb-2"
                placeholder="Enter your message!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="btn">
              <button
                type="submit"
                className="btn btn-success"
                onClick={sendMail}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="con-item-left col-md-6 my-2 text-center">
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
