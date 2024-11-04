import React from "react";
import "./Style/Carousel.css";

const Carousel = () => {
  return (
    <div className="mx-3 my-3">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./images/h-3.png" className="d-block w-100 carousel-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./images/h-1.jpg" className="d-block w-100 carousel-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./images/h-2.jpg" className="d-block w-100 carousel-img" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
