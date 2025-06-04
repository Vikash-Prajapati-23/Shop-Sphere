import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Style/Navbar.css";
import { themeContext } from "../../App";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../features/cartSlice";

const Navbar = ({ cart, setQuery, isLoggedIn, setIsLoggedIn }) => {
  const [guestCart, setGuestCart] = useState(0);
  const toggleMode = useContext(themeContext);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    const updatedGuestCart = () => {
      const guestCartData = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCart(guestCartData.length);
    };

    window.addEventListener("guestCartUpdate", updatedGuestCart);
    window.dispatchEvent(new Event("guestCartUpdate"));

    updatedGuestCart();

    return () => window.removeEventListener("guestCartUpdated", updatedGuestCart);

  });

  return (
    <nav
      style={{
        backgroundColor: toggleMode.mode === true ? "#35374B" : "#fff",
        color: toggleMode.mode === true ? "#fff" : "black",
        boxShadow: toggleMode.mode
          ? "rgba(192, 189, 189, 0.61) 0px 15px 10px -10px"
          : "rgba(96, 95, 95, 0.65) 0px 15px 10px -10px",
      }}
      className={`navbar sticky-sm-top sticky-top p-0 navbar-expand-lg`}
    >
      <div className="d-flex justify-content-between container">
        <a className="navbar-brand">
          <img
            src="./images/logo1.png"
            style={{ borderRadius: "50%", maxHeight: "60px" }}
            alt="Logo"
            className="img-fluid "
          />
        </a>

        <button
          className="navbar-toggler fs-5 fs-md-3 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" data-bs-theme="dark">
            <li className="nav-item navs">
              <Link
                style={{ color: toggleMode.mode === true ? "#fff" : "black" }}
                className="nav-link fw-bold"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item navs">
              <Link
                style={{ color: toggleMode.mode === true ? "#fff" : "black" }}
                className="nav-link fw-bold"
                to="/AboutUs"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item navs dropdown">
              <Link
                style={{ color: toggleMode.mode === true ? "#fff" : "black" }}
                className="nav-link dropdown-toggle fw-bold"
                to="/Categories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item navs" to="/Men">
                    Men
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item navs" to="/Women">
                    Women
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item navs" to="/Kid">
                    Kid
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item navs" to="/Electronics">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item navs" to="/Jewelery">
                    Jewelery
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item navs" to="/Electronics">
                    Electronics
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="search_box d-flex" role="search">
            <input
              style={{
                color: toggleMode.mode === true ? "#fff" : "black",
              }}
              type="text"
              className="search-bar"
              placeholder="Search Products"
              aria-label="Search Products"
              aria-describedby="button-addon2"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <button className="search-btn" type="button" id="button-addon2">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <ul className="navbar-nav justify-content-start justify-content-md-around list-group d-flex">
            <li className="nav-item navs">
              <span
                style={{ color: toggleMode.mode === true ? "#fff" : "black" }}
                className="material-symbols-outlined sun nav-link active "
                onClick={toggleMode.toggleTheme}
              >
                light_mode
              </span>
            </li>
            <li className="nav-item navs">
              <span
                style={{ color: toggleMode.mode === true ? "#fff" : "black" }}
                className="material-symbols-outlined moon hide nav-link active "
                onClick={toggleMode.toggleTheme}
              >
                dark_mode
              </span>
            </li>
            <li className="nav-item navs">
              {isLoggedIn ? (
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        "http://localhost:3001/api/auth/logout",
                        {
                          method: "GET",
                          credentials: "include", // sends cookie!
                        }
                      );

                      if (res.ok) {
                        setIsLoggedIn(false); // update local state
                        navigate("/LoginSignup");
                        toast.success("Logged out successfully!");
                        window.location.reload();
                      } else {
                        toast.error("Logout failed");
                      }
                    } catch (error) {
                      toast.error("An error occurred");
                    }
                  }}
                  className="nav-link active fw-bold"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  style={{ color: toggleMode.mode === true ? "#fff" : "black" }}
                  className="nav-link active fw-bold outli"
                  to="/LogInSignUp"
                >
                  Log In
                </Link>
              )}
            </li>
            <li className="nav-item navs">
              <Link className="nav-link active " to="/WishList">
                <i className="fa-solid fa-heart wishlist-icon "></i>
              </Link>
            </li>
            <li className="nav-item navs">
              <Link
                style={{
                  color: toggleMode.mode === true ? "#fff" : "black",
                }}
                className="nav-link active"
                to="/Cart"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="position-absolute top-1 start-90 translate-middle badge rounded-pill bg-success">
                  {isLoggedIn ? cart.length : guestCart}
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
