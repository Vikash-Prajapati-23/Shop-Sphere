import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import { useFormData } from "../../context/formDataContext";
import { useNavigate } from "react-router-dom";
import { useCartData } from "../../context/allCartData";

const Home = ({
  handleRemoveWishlist,
  handleWishList,
  setClicked,
  clicked,
  query,
}) => {
  const { savedAddresses } = useFormData();
  const { isLoggedIn } = useCartData();
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate("/LoginSignup");
  };

  return (
    <div>
      {isLoggedIn && savedAddresses === null ? (
        <div className="address-size">
          <i className="fa-solid fa-location-dot pt-1"></i>
          <p className="m-0">
            {savedAddresses && savedAddresses.length > 0
              ? savedAddresses[0].address.slice(0, 30)
              : ""}
            ...,
          </p>
          <span className="address-type">
            {savedAddresses && savedAddresses.length > 0
              ? savedAddresses[0].addressType
              : ""}
          </span>
          {console.log(savedAddresses)}
        </div>
      ) : (
        <div className="non-login-para ms-3 mt-2">
          <span className="para-size">Add an address.</span>
          <button
            onClick={redirectLogin}
            className="home-add-address bg-success"
          >
            Add address
          </button>
        </div>
      )}

      <Carousel />

      <Products
        handleWishList={handleWishList}
        handleRemoveWishlist={handleRemoveWishlist}
        setClicked={setClicked}
        clicked={clicked}
        query={query}
      />
    </div>
  );
};
export default Home;
