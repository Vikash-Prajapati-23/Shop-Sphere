import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Style/Footer.css";
import { themeContext } from "../../App";

const Footer = () => {

  const toggleMode = useContext(themeContext);

  return (
    <div className="card txt-clr">
      <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className={`card-header text-center fw-bold`}>Made with &#128151; by team shopsphare!</div>
      <div style={{ backgroundColor: toggleMode.mode === true ? "#121212" : "#EAECED", color: toggleMode.mode === true ? "#fff" : "black" }} className={`card-body container-fluid d-flex row `}>
        <div className="footer-left d-flex col-md-6">
          <div className="foot-items mx-auto">
            <h6 className="foot-headings" >About</h6>
            <ul className="foot-list list-group">
              <li className="nav-item" >
                <Link className="nav-link active" to={'/AboutUs'} >
                  About Shop Sphere
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/ContactUs'} >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Carrers
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Shop Sphere Stories
                </Link>
              </li>
            </ul>
          </div>
          <div className="foot-items mx-auto">
            <h6 className="foot-headings" >Help</h6>
            <ul className="foot-list list-group">
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Payments
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Shipping
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Cancellation & Returns
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="foot-items mx-auto">
            <h6 className="foot-headings" >Consumer Policy</h6>
            <ul className="foot-list list-group">
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Cancellation & Returns
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/'} >
                  Security
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/TermsOfUse'} >
                  Terms of Use
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/#'} >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="foot-items mx-auto">
            <h6 className="foot-headings" >Online Shopping</h6>
            <ul className="foot-list list-group">
              <li className="nav-item" >
                <Link className="nav-link active" to={'/Men'} >
                  Men
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/Women'} >
                  Women
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/Electronics'} >
                  Electronics
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link active" to={'/Jewelery'} >
                  Jewelery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-right d-flex col-md-6">
          <div className="contact-foot foot-items mx-auto">
            <h5 className="foot-headings" >Reach Us</h5>
            <p>Shop Sphere PVT LTD</p>
            <p>IIT boral, Future Institute Of Techonology</p>
          </div>

          <div className="contact-foot foot-items mx-auto ms-4">
            <h5 className="foot-headings" >Social</h5>
            <i className="fa-brands fa-facebook foot-icons"></i>
            <i className="fa-brands fa-facebook-messenger foot-icons"></i>
            <i className="fa-brands fa-square-instagram foot-icons"></i>
            <i className="fa-brands fa-square-threads foot-icons"></i>
            <i className="fa-brands fa-youtube foot-icons"></i>
            <i className="fa-brands fa-twitter foot-icons"></i>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className={`card-footer text-center fw-bold`}> &copy; 2024 copyright || shopsphare.com</div>
    </div>
  );
};

export default Footer;
