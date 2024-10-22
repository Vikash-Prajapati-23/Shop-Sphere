import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Style/Navbar.css";
import Home from "../Home/Home";
import AboutUs from "../AboutUs/AboutUs";
import Categories from "../Categories/Categories";
import Men from "../Men/Men";
import Women from "../Women/Women";
import Kid from "../Kid/Kid";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-danger">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">
          Shopsphare 
        </a> */}
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
            <li className="nav-item mx-2">
              <a className="nav-link active mt-2" aria-current="page" href="#">
                <Home />
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link active mt-2" href="#">
                {/* <AboutUs /> */}
                About Us
              </a>
            </li>
            <li className="nav-item mx-2 dropdown">
              <a
                className="nav-link active dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <Categories />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <Men />
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Women />
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Kid />
                  </a>
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
          <ul className="list-group">
            <li className="nav-item list-item nav-login mt-2 mx-2"><a href="#">Log in</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
