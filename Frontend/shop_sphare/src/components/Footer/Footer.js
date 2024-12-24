import React, { useContext } from "react";
import "./Style/Footer.css";
import { themeContext } from "../../App";

const Footer = () => {

  const toggleMode = useContext(themeContext);

  return (
    <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff", txt_clr: toggleMode.mode === true ? "black" : "#fff" }} >
      <div className="card txt-clr">
        <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff" }} className={`card-header text-center text-${toggleMode.mode}`}>Made with &#128151; by team shopsphare!</div>
        <div className={`card-body container-fluid d-flex row text-${toggleMode.mode}`}>
          <div className="footer-left d-flex col-md-6">
            <div className="foot-items mx-auto">
              <h6>About</h6>
              <ul className="foot-list list-group">
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
                {/* <li><ContactUs /></li> */}
                <li>ContactUs </li>
                <li>Carrers</li>
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
              </ul>
            </div>
            <div className="foot-items mx-auto">
              <h6>About</h6>
              <ul className="foot-list list-group">
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
                {/* <li><ContactUs /></li> */}
                <li>ContactUs </li>
                <li>Carrers</li>
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
              </ul>
            </div>
            <div className="foot-items mx-auto">
              <h6>About</h6>
              <ul className="foot-list list-group">
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
                {/* <li><ContactUs /></li> */}
                <li>ContactUs </li>
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
              </ul>
            </div>
            <div className="foot-items mx-auto">
              <h6>About</h6>
              <ul className="foot-list list-group">
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
                {/* <li><ContactUs /></li> */}
                <li>ContactUs </li>
                <li>Carrers</li>
                {/* <li><AboutUs /></li> */}
                <li>About Us </li>
              </ul>
            </div>
          </div>

          <div className="footer-right d-flex col-md-6">
            <div className="contact-foot foot-items mx-auto">
              <h5>Reach Us</h5>
              <p>Shop Sphare PVT LTD</p>
              <p>IIT boral, Future Institute Of Techonology</p>
            </div>

            <div className="contact-foot foot-items mx-auto ms-4">
              <h5>Social</h5>
              <i className="fa-brands fa-facebook foot-icons"></i>
              <i className="fa-brands fa-facebook-messenger foot-icons"></i>
              <i className="fa-brands fa-square-instagram foot-icons"></i>
              <i className="fa-brands fa-square-threads foot-icons"></i>
              <i className="fa-brands fa-youtube foot-icons"></i>
              <i className="fa-brands fa-twitter foot-icons"></i>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff" }} className={`card-footer text-body-secondary text-center fw-bold`}> &copy; 2024 copyright || shopsphare.com</div>
      </div>
      {/* Footer
       <ContactUs />
       <TermsConditions /> */}
    </div>
  );
};

export default Footer;
