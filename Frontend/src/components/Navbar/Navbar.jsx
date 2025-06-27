import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Style/Navbar.css";

const Navbar = ({
  cart,
  setCart,
  setQuery,
  isLoggedIn,
  setIsLoggedIn,
  name,
  firstName,
}) => {
  const [guestCart, setGuestCart] = useState(0);
  const [isDropDown, setIsDropDown] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    const updatedGuestCart = () => {
      const guestCartData = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCart(guestCartData.length);
    };

    window.addEventListener("guestCartUpdated", updatedGuestCart);
    window.dispatchEvent(new Event("guestCartUpdated"));

    updatedGuestCart();
    setCart(cart);
    return () =>
      window.removeEventListener("guestCartUpdated", updatedGuestCart);
  }, [setCart]);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include", // sends cookie!
        }
      );
      if (res.ok) {
        setIsLoggedIn(false); // update local state
        navigate("/LoginSignup");
        toast.success("Logged out successfully!");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <nav
      className={`navbar bg-white shadow sticky-sm-top py-1 sticky-top p-0 navbar-expand-lg`}
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
          <ul className="navbar-nav me-auto mb-0" data-bs-theme="dark">
            <li className="nav-item navs">
              <Link
                className="nav-link py-0 fw-bold navs-text-size"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item navs">
              <Link className="nav-link py-0 fw-bold navs-text-size" to="/AboutUs">
                About Us
              </Link>
            </li>
            <li className="nav-item navs dropdown">
              <Link
                className="nav-link py-0 dropdown-toggle fw-bold navs-text-size"
                to="/Categories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item navs navs-text-size"
                    to="/category/mens-clothing"
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item navs navs-text-size"
                    to="/category/womens-clothing"
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item navs navs-text-size"
                    to="/category/electronics"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item navs navs-text-size"
                    to="/category/jewelery"
                  >
                    Jewelery
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="search_box d-none d-lg-flex me-2 " role="search">
            <input
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

          <ul className="navbar-nav">
            {/* // Login/Logout */}
            <li 
              className="custom-dropdown mt-2 m-md-0"
              onMouseOver={() => setIsDropDown(true)}
              onMouseLeave={() => setIsDropDown(false)}
            >
              {isLoggedIn ? (
                <div className="nav-item active fw-bold">
                  <div className="user-log-out">
                    <i className="fa-regular fa-circle-user user-icon"></i>
                    <span> {firstName ? firstName : name} </span>
                    <i className="fa-solid fa-chevron-down arrow-icon"></i>
                  </div>
                  {isDropDown && (
                    <ul className="custom-dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/Profile">
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link className="dropdown-item" to="/MyOrders">
                          My orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/WishList">
                          Wishlist
                        </Link>
                      </li>
                      <li className="dropdown-item" onClick={handleLogout}>
                        <i className="ri-logout-circle-r-line user-icon me-2"></i>
                        <span className="navs-text-size"> Log Out </span>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link className="nav-item active fw-bold" to="/LogInSignUp">
                  <div className="user-log-in">
                    <i className="fa-regular fa-circle-user user-icon"></i>
                    <span className="navs-text-size"> Log In </span>
                    <i className="fa-solid fa-chevron-down arrow-icon"></i>
                  </div>
                </Link>
              )}
            </li>
            <li className="nav-item m-lg-auto">
              {/* // WishList */}
              <Link className="nav-link active " to="/WishList">
                <i className="fa-solid fa-heart wishlist-icon "></i>
              </Link>
            </li>
            <li className="nav-item m-lg-auto">
              {/* // Cart */}
              <Link className="nav-link active" to="/Cart">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="position-absolute top-1 start-90 translate-middle badge rounded-pill bg-success badge-text-size">
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
