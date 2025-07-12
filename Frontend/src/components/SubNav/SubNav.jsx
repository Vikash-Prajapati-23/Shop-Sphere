import { Link } from "react-router-dom";
import "./Style/SubNav.css";
import { useCartData } from "../../context/allCartData";
import { useEffect, useState } from "react";

const SubNav = () => {
  const { isLoggedIn, cart } = useCartData();
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible((visible) => (visible = !visible));
  };

  useEffect(() => {
    setIsVisible(false);
  }, []);

  return (
    <div className="sub-nav">
      <ul className="subnav-ul">
        <li className="subnav-lists">
          <i className="fa-solid fa-house text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/">
            Home
          </Link>
        </li>
        <li onClick={handleToggle} className="subnav-lists">
          <i className="fa-solid fa-table text-center subnav-icons"></i>
          <span className="subnav-links category-dropDown subnav-text fw-semibold">
            Categories
          </span>
          <ul
            className={`subNav-dropdown-menu shadow-md ${
              isVisible ? "d-block" : "d-none"
            }`}
          >
            <li>
              <Link
                onClick={() => setIsVisible(false)}
                className="dropdown-item py-1 px-2 subnav_font_size mb-0"
                to="/category/mens-clothing"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsVisible(false)}
                className="dropdown-item py-1 px-2 subnav_font_size mb-0"
                to="/category/womens-clothing"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsVisible(false)}
                className="dropdown-item py-1 px-2 subnav_font_size mb-0"
                to="/category/electronics"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsVisible(false)}
                className="dropdown-item py-1 px-2 subnav_font_size mb-0"
                to="/category/jewelery"
              >
                Jewelery
              </Link>
            </li>
          </ul>
        </li>
        <li className="subnav-lists">
          <i className="fa-solid fa-user text-center subnav-icons"></i>
          <Link
            className="subnav-links subnav-text fw-semibold"
            to={`${isLoggedIn ? "/Profile" : "/LoginSignup"}`}
          >
            Account
          </Link>
        </li>
        <li className="subnav-lists">
          <div className="subnav-cart-length">
            <span>{cart.length}</span>
          </div>
          <i className="fa-solid fa-cart-shopping text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/Cart">
            Cart
          </Link>
        </li>
        <li className="subnav-lists">
          <i className="fa-solid fa-heart text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/WishList">
            Wishlist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubNav;
