import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Style/Navbar.css";
import { useCartData } from "../../context/allCartData";

const Navbar = ({
  setQuery,
  handleUserLogout,
  name,
  firstName,
}) => {
  const [guestCart, setGuestCart] = useState(0);
  const [isDropDown, setIsDropDown] = useState(false);
  const { isLoggedIn, cart, setCart } = useCartData();

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
    handleUserLogout();
  };

  return (
    <nav className={`bg-white shadow-md sticky-top Nav`}>
      <a className="navbar-brand-img">
        <img
          src="./images/logo1.png"
          style={{ borderRadius: "50%", maxHeight: "60px" }}
          alt="Logo"
          className="img-fluid"
        />
      </a>

      <div className="main-navs">
        <ul
          className="list-styls list-styles-home custom-dropdown"
        >
          <li className="nav-item navs">
            <Link
              className="nav-link py-0 fw-semibold navs-fs"
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item navs">
            <Link className="nav-link py-0 fw-semibold navs-fs" to="/AboutUs">
              About Us
            </Link>
          </li>
          <li className="nav-item navs">
            <Link className="nav-link py-0 fw-semibold navs-fs" to="/ContactUs">
              Contact Us
            </Link>
          </li>
          <li className="nav-item navs dropdown">
            <Link
              className="nav-link py-0 dropdown-toggle fw-semibold navs-fs"
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

        <div className="search_box " role="search">
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

        <ul className="list-styls list-styls-mid-screen">
          {/* // Login/Logout */}
          <li
            className="custom-dropdown m-md-0"
            onMouseOver={() => setIsDropDown(true)}
            onMouseLeave={() => setIsDropDown(false)}
          >
            {isLoggedIn ? (
              <div className="nav-item active fw-semibold">
                <div className="user-log-out">
                  <i className="fa-regular fa-circle-user user-icon"></i>
                  <span className="navs-text-size">
                    {" "}
                    {firstName ? firstName : name.split(" ")[0]}
                  </span>
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
              <Link className="nav-item active fw-semibold" to="/LogInSignUp">
                <div className="user-log-in">
                  <i className="fa-regular fa-circle-user user-icon"></i>
                  <span className="navs-text-size"> Login </span>
                  <i className="fa-solid fa-chevron-down arrow-icon"></i>
                </div>
              </Link>
            )}
          </li>
          {/* // WishList */}
          <li className="nav-item m-lg-auto">
            <Link className="nav-link active" to="/WishList">
              <i className="fa-solid fa-heart wishlist-icon "></i>
            </Link>
          </li>
          {/* // Cart */}
          <li className="nav-item m-lg-auto">
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
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
