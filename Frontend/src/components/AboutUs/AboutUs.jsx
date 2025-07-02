import "./Style/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-main mb-md-0 mb-5">
      <span className="about-head fw-semibold">About Shop Sphare</span>

      <p className="text-justify font-size-s">
        At Shop Sphare, we believe that shopping should be more than just a
        transaction, it should be an experience. Our goal is to offer you the
        finest products, a seamless shopping journey, and customer service that
        goes above and beyond.Shop Sphare began with a simple mission: to bring
        quality products to customers at affordable prices, with the convenience
        of shopping from home. Over the years, we've grown into a trusted name
        in e-commerce, delivering thousands of products to satisfied customers
        worldwide.
      </p>

      <h3 className="my-3 text-center font-size-b">Our Values</h3>
      <div className="about-para">
        <div className="about-para-left">
          <div className="about-flex row">
            <div className="para-left col-md-6">
              <h5 className="font-size-b">Customer First:</h5>
              <p className="text-justify font-size-s">
                We put our customers at the heart of everything we do. Your
                satisfaction is our top priority, and we're here to ensure that
                every order is fulfilled with care and attention.
              </p>
              <h5 className="font-size-b">Quality Assurance:</h5>
              <p className="text-justify font-size-s">
                We handpick products from trusted vendors and manufacturers to
                ensure that every item meets our high standards of quality. We
                stand behind everything we sell, so you can shop with
                confidence.
              </p>
              <h5 className="font-size-b">Innovation:</h5>
              <p className="text-justify font-size-s">
                We're always looking for ways to improve your shopping
                experience, from enhancing our website to offering the latest in
                product trends. Whether you're looking for fashion, tech, or
                home essentials, you’ll always find something new and exciting
                at Shop Sphare.
              </p>
              <h5 className="font-size-b">Sustainability:</h5>
              <p className="text-justify font-size-s">
                We are committed to reducing our environmental impact. From
                eco-friendly packaging to sourcing sustainable products, we’re
                doing our part to protect the planet.
              </p>
            </div>

            <div className="para-right col-md-6 text-center mb-2">
              <img className="container-fluid" src="./images/6.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
