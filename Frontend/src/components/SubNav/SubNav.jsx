import { Link, useNavigate } from "react-router-dom";
import "./Style/SubNav.css";

const SubNav = ({
  cart,
  setCart,
  setQuery,
  isLoggedIn,
  setIsLoggedIn,
  name,
  firstName,
}) => {
  return (
    <div className="sub-nav">
      <ul className="subnav-ul">
        <li className="subnav-lists">
            <i class="fa-solid fa-house text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/">
            Home
          </Link>
        </li>
        <li className="subnav-lists">
          <i class="fa-solid fa-table text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/">
            Categories
          </Link>
        </li>
        <li className="subnav-lists">
          <i class="fa-solid fa-user text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to={`${isLoggedIn ? "/Profile" :  "/LoginSignup"}`}>
            Account
          </Link>
        </li>
        <li className="subnav-lists">
          <i class="fa-solid fa-cart-shopping text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/Cart">
            Cart
          </Link>
        </li>
        <li className="subnav-lists">
          <i class="fa-solid fa-heart text-center subnav-icons"></i>
          <Link className="subnav-links subnav-text fw-semibold" to="/WishList">
            Wishlist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SubNav;
