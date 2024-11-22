import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-danger bg-danger">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link className="nav-link active fw-bold" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link active fw-bold" to="/AboutUs">
                {/* <AboutUs /> */}
                About Us
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link active dropdown-toggle fw-bold"
                to="/Categories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/Men">
                    Men
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Women">
                    Women
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Kid">
                    Kid
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search Products"
                aria-label="Search Products"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-light"
                type="button"
                id="button-addon2"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
          <ul className="navbar-nav list-group d-flex">
            <li className="nav-item mx-2">
              <Link className="nav-link active fw-bold" to="/LogInSignUp">
                Log In
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active " to="/WishList">
                <i class="fa-solid fa-heart"></i>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active " to="/Cart">
                <i class="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
