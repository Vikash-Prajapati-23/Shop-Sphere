import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import { useFormData } from "../../context/formDataContext";
import { useNavigate } from "react-router-dom";

const Home = ({
  handleCartAddition,
  handleRemoveWishlist,
  handleWishList,
  setClicked,
  isLoggedIn,
  clicked,
  query,
}) => {
  const { savedAddresses } = useFormData();
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate("/LoginSignup")
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="address-size">
          <i className="fa-solid fa-location-dot pt-1"></i>
          <p className="m-0">
            {savedAddresses && savedAddresses.length > 0
              ? savedAddresses[0].address.slice(0, 30)
              : ""}
            ...,
          </p>
          <span className="fw-semibold">
            {savedAddresses && savedAddresses.length > 0
              ? savedAddresses[0].pincode
              : ""}
            ,
          </span>
          <span className="address-type">
            {savedAddresses && savedAddresses.length > 0
              ? savedAddresses[0].addressType
              : ""}
          </span>
        </div>
      ) : (
        <div className="non-login-para ms-3 mt-2">
          <span className="para-size">
            Add an address.
          </span>
          <button onClick={redirectLogin} className="home-add-address bg-success">Add address</button>
        </div>
      )}

      <Carousel />
      <Products
        isLoggedIn={isLoggedIn}
        handleCartAddition={handleCartAddition}
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
