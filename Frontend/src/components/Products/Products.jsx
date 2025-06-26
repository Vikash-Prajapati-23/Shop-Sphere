import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Products.css";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import { toast } from "react-hot-toast";

const Products = ({
  handleCartAddition,
  handleWishList,
  handleRemoveWishlist,
  setClicked,
  clicked,
  isLoggedIn,
  query,
}) => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/products/allproduct`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const products = await response.json();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Product Fetch Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  };

  const handleWishlistToggle = async (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast("Please log in to manage your wishlist");
      return;
    }

    const productId = product._id || product.id;

    if (clicked) {
      await handleRemoveWishlist(productId);
    } else {
      await handleWishList(product);
    }

    setClicked(!clicked);
  };

  const handleCardClick = (product) => {
    if (product && product.id) {
      navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
    } else {
      toast.error("Product ID not found");
    }
  };

  if (!products) {
    return (
      <div>
        {" "}
        <Loading />{" "}
      </div>
    ); // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div className="product-page">
      <h3 className="text-center mt-2">Products you may like!</h3>
      <div className="card-location">
        {filteredProducts
          .filter((product) => product.title.toLowerCase().includes(query))
          .map((product, index) => (
            <div
              className="col-lg-4 col-md-6 col-5 flex-shrink-0 p-0 mx-auto my-2"
              key={product.id || index}
              onClick={() => handleCardClick(product)}
            >
              <Card
                {...product}
                handleAddToCart={() => handleAddToCart(product)} // Pass function reference
                handleWishlist={() => handleWishlistToggle(product)} // Pass function reference
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
