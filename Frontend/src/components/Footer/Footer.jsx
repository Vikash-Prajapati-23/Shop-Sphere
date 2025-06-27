import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Style/Footer.css";
import { themeContext } from "../../App";

const Footer = () => {
  const toggleMode = useContext(themeContext);

  return (
    <div className="">
      <div
        style={{
          backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff",
          color: toggleMode.mode === true ? "#fff" : "black",
        }}
        className={`py-2 text-center fw-bold`}
      >
        Made with &#128151; by team shopsphare!
      </div>
      <div
        style={{
          backgroundColor: toggleMode.mode === true ? "#121212" : "#EAECED",
          color: toggleMode.mode === true ? "#fff" : "black",
        }}
        className={`d-md-flex justify-content-center gap-5 p-4`}
      >
        <div className="d-flex row justify-content-center justify-content-md-evenly p-1 gap-4 gap-md-2 gap-lg-5">
          <div className="px-3 col-sm-2 col-md-4 col-lg-2 w-md-50 w-lg-25 ">
            <h6 className="foot-headings">About</h6>
            <ul className="foot-list list-group">
              <li className="nav-item">
                <Link className="nav-link active" to={"/AboutUs"}>
                  About Shop Sphere
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/ContactUs"}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Carrers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Shop Sphere Stories
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-3 col-sm-2 col-md-4 col-lg-2 w-md-50 w-lg-25 ">
            <h6 className="foot-headings">Help</h6>
            <ul className="foot-list list-group">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Payments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Shipping
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Cancellation & Returns
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-3 col-sm-2 col-md-4 col-lg-2 w-md-50 w-lg-25 ">
            <h6 className="foot-headings">Consumer Policy</h6>
            <ul className="foot-list list-group">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Cancellation & Returns
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Security
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/TermsOfUse"}>
                  Terms of Use
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/#"}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-3 col-sm-2 col-md-4 col-lg-2 w-md-50 w-lg-25 ">
            <h6 className="foot-headings">Online Shopping</h6>
            <ul className="foot-list list-group">
              <li className="nav-item">
                <Link className="nav-link active" to={"/Men"}>
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/Women"}>
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/Electronics"}>
                  Electronics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/Jewelery"}>
                  Jewelery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-md-block gap-5 justify-content-center p-2 mt-3 mt-md-0 mt-lg-0">
          <div className="contact-foot foot-items mx-auto">
            <h5 className="foot-headings">Reach Us</h5>
            <p>Shop Sphere PVT LTD </p>
            <p>ABC road, Gyanpur gram, Unknown, 300002</p>
          </div>

          <div className="mt-md-5 mt-0 mt-lg-0">
            <h5 className="foot-headings">Social</h5>
            <i className="fa-brands fa-facebook foot-icons"></i>
            <i className="fa-brands fa-facebook-messenger foot-icons"></i>
            <i className="fa-brands fa-square-instagram foot-icons"></i>
            <i className="fa-brands fa-square-threads foot-icons"></i>
            <i className="fa-brands fa-youtube foot-icons"></i>
            <i className="fa-brands fa-twitter foot-icons"></i>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff",
          color: toggleMode.mode === true ? "#fff" : "black",
        }}
        className={`text-center fw-bold`}
      >
        {" "}
        &copy; 2024 copyright || shopsphare.com
      </div>
    </div>
  );
};

export default Footer;
