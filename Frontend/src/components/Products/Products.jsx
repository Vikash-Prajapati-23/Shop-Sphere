import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Products.css";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import { themeContext } from "../../App";
import { toast } from "react-hot-toast";

const Products = ({ handleCartAddition, handleWishList, query, isLoggedIn }) => {
  const [products, setProducts] = useState(null);
  // const [loadProduct, setloadProduct] = useState(false);  // For Loading/Spinning component.. !
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const toggleMode = useContext(themeContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/products/allproductd",
          {
            method: "GET",
            credentials: "include", // Include cookies for authentication
          }
        );
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, display all products.
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  };

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
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
    <div
      style={{
        backgroundColor: toggleMode.mode === true ? "#494343" : "#fff",
        color: toggleMode.mode === true ? "#fff" : "black",
      }}
      className="container my-3"
    >
      <h3 className="text-center mt-2">Products you may like!</h3>
      <div className="d-flex flex-wrap justify-content-start">
        {filteredProducts
          .filter((product) => product.title.toLowerCase().includes(query))
          .map((product, index) => (
            <div
              className="col-md-3 flex-shrink-0 my-2"
              key={product.id || index}
              onClick={() => handleCardClick(product)}
            >
              <Card
                {...product}
                handleAddToCart={() => handleAddToCart(product)} // Pass function reference
                handleWishlist={() => handleWishlist(product)} // Pass function reference
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
