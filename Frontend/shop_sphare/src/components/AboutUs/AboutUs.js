import React, {useContext} from "react";
import "./Style/AboutUs.css";
import { themeContext } from "../../App";

const AboutUs = () => {

  const toggleMode = useContext(themeContext);

  return (
    <div style={{backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className="m-5">
      <h2 className="about-head text-center">Welcome to Shop Sphare!</h2>
      <p>
        At Shop Sphare, we believe that shopping should be more than just a
        transaction—it should be an experience. Our goal is to offer you the
        finest products, a seamless shopping journey, and customer service that
        goes above and beyond.Shop Sphare began with a simple mission: to bring
        quality products to customers at affordable prices, with the convenience
        of shopping from home. Over the years, we've grown into a trusted name
        in e-commerce, delivering thousands of products to satisfied customers
        worldwide.
      </p>

      <h3 className="my-3 text-center">Our Values</h3>
      <div className="about-para">
        <div className="about-para-left">
          <div className="d-flex row">
            <div className="para-left col-md-6">
              <h5>Customer First:</h5>
              <p>
                We put our customers at the heart of everything we do. Your
                satisfaction is our top priority, and we're here to ensure that
                every order is fulfilled with care and attention.
              </p>
              <h5>Quality Assurance:</h5>
              <p>
                We handpick products from trusted vendors and manufacturers to
                ensure that every item meets our high standards of quality. We
                stand behind everything we sell, so you can shop with
                confidence.
              </p>
              <h5>Innovation:</h5>
              <p>
                We're always looking for ways to improve your shopping
                experience, from enhancing our website to offering the latest in
                product trends. Whether you're looking for fashion, tech, or
                home essentials, you’ll always find something new and exciting
                at Shop Sphare.
              </p>
              <h5>Sustainability:</h5>
              <p>
                We are committed to reducing our environmental impact. From
                eco-friendly packaging to sourcing sustainable products, we’re
                doing our part to protect the planet.
              </p>
            </div>

            <div className="para-right col-md-6 text-center">
              <img
                className="container-fluid"
                src="./images/6.jpg"
                // style={{ height: "350px", width: "500px" }}
                alt=""
              />
            </div>
          </div>
          <div className="about-para-left my-4">
            <h5 className="text-center">Shop Sphare Team Members</h5>
            <div className="team-info d-flex row row-cols-3 text-center">
              <div className="about-team-member col">
                <img
                  className="container-fluid"
                  // style={{ height: "200px", width: "200px" }}
                  src="./images/Mmg.png"
                  alt=""
                />
                <p>Vikash Prajapati</p>
              </div>
              <div className="about-team-member col">
                <img
                  className="container-fluid"
                  src="./images/7.jpeg"
                  alt=""
                />
                <p>Tanmoy Das</p>
              </div>
              <div className="about-team-member col">
                <img
                  className="container-fluid"
                  src="./images/9.jpeg"
                  alt=""
                />
                <p>Shubhanjan </p>
              </div>
              <div className="about-team-member col">
                <img
                  className="container-fluid"
                  src="./images/10.jpeg"
                  alt=""
                />
                <p>Shakil Hussain</p>
              </div>
              <div className="about-team-member col">
                <img
                  className="container-fluid"
                  src="./images/11.jpeg"
                  alt=""
                />
                <p>Shoubhik Guha</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
