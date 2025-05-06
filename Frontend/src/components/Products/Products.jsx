import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Products.css";
import Card from "../Card/Card";
import Loading from '../Loading/Loading';
import { themeContext } from "../../App";

const Products = ({ handleCartAddition, handleWishList, query }) => {
  const [products, setProducts] = useState(null);
  const [loadProduct, setloadProduct] = useState(false);  // For Loading/Spinning component.. !
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const toggleMode = useContext(themeContext);

  const fetchProducts = async () => {
    setloadProduct(true);
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    setProducts(data);
    setloadProduct(false);
    setFilteredProducts(data); // Initially, display all products.
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    handleCartAddition(product);
  };

  const handleWishlist = (product) => {
    handleWishList(product);
  };

  const handleCardClick = (product) => {
    navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
  };

  if (!products) {
    return <div> <Loading /> </div>; // Added: Loading state to handle asynchronous fetch.
  }

  return (
    <div style={{ backgroundColor: toggleMode.mode === true ? "#494343" : "#fff", color: toggleMode.mode === true ? "#fff" : "black" }} className="container my-3">
      <h3 className="text-center mt-2">Products you may like!</h3>
      <div className="d-flex flex-wrap justify-content-start">
        {filteredProducts.filter((product) => product.title.toLowerCase().includes(query)).map((product) => (
          <div
            className="col-md-3 flex-shrink-0 my-2"
            key={product.id}
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
