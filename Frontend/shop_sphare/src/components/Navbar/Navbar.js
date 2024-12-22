import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Style/Navbar.css";
import { themeContext,  } from "../../App";

const Navbar = () => {


  // const [mode, setMode] = useState(false);
  
  //   const toggleTheme = () => {
  //     let sun = document.querySelector(".sun");
  //     let moon = document.querySelector(".moon");
  //     if (mode === false) {
  //       setMode(true);
  //       moon.classList.remove('hide');
  //       sun.classList.add('hide');
  //       document.body.style.backgroundColor = '#1E3A8A';
  //       document.body.style.color = '#F5F5F5';
  //     }
  //     else {
  //       setMode(false);
  //       sun.classList.remove('hide');
  //       moon.classList.add('hide');
  //       document.body.style.backgroundColor = '#4169E1';
  //       document.body.style.color = 'fff';
  //     }
  //   }


  const toggleMode = useContext(themeContext);

  return (
    <nav className={`navbar sticky-sm-top sticky-top navbar-expand-lg navbar-${toggleMode.mode} navbar-bg-${toggleMode.mode}`}>
      <div className="container-fluid">
        <a className="navbar-brand">
          <img
            src="./images/logo1.png"
            style={{ borderRadius: "50%", height: "4rem" }}
            alt="Logo"
          />
        </a>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" data-bs-theme="dark">
            <li className="nav-item ">
              <Link
                className="nav-link active fw-bold"
                aria-current="page"
                to="/"
              >
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
                <li>
                  <Link className="dropdown-item" to="/Electronics">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Jewelery">
                    Jewelery
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Electronics">
                    Electronics
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex" role="search">
            <div className="input-group mx-3">
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
          </div>
          {/* <div className="theme mx-2">
            
            
          </div> */}
          <ul className="navbar-nav list-group d-flex">
            <li className="nav-item ">
              <Link className="nav-link active fw-bold">
                <span><i className="fa-solid fa-sun sun" onClick={toggleMode.toggleTheme} ></i></span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link active fw-bold">
                <span><i className="fa-solid fa-moon moon hide" onClick={toggleMode.toggleTheme} ></i></span>
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link className="nav-link active fw-bold" to="/LogInSignUp">
                Log In
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active " to="/WishList">
                <i className="fa-solid fa-heart wishlist-icon "></i>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link active " to="/Cart">
                <i className="fa-solid fa-cart-shopping cart-icon"></i>
                <span className="position-absolute top-1 start-90 translate-middle badge rounded-pill bg-success">
                  9
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
