import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";
import { useFormData } from "../../context/formDataContext";
import { useEffect } from "react";
import { useAddress } from "../../context/addressDetailsContext";

const Home = ({
  handleCartAddition,
  handleRemoveWishlist,
  handleWishList,
  setClicked,
  isLoggedIn,
  clicked,
  query,
}) => {
  const { savedAddresses, setSavedAddresses } = useFormData();
  const {selectedAddress, setSelectedAddress} = useAddress();

  const fetchAddressDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/savedAddress`, {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json();
      if (response.ok) {
        setSelectedAddress(data.addresses);
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchAddressDetails();
  }, [isLoggedIn]);

  return (
    <div>
      <div>
        <p className="address-size">{selectedAddress && selectedAddress.length > 0 ? selectedAddress[1].address : ""}</p>
      </div>
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
