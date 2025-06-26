import "./Style/Home.css";
import Carousel from "../Carousel/Carousel";
import Products from "../Products/Products";

const Home = ({
  handleCartAddition,
  handleRemoveWishlist,
  handleWishList,
  setClicked,
  isLoggedIn,
  clicked,
  query,
}) => {
  return (
    <div>
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
