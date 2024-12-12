import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Products.css";
import Card from "../Card/Card";

const Products = ({ showAlert }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Added: State for filtered products.
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data); // Initially, display all products.
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
  };

  return (
    <div className="container card my-3">
      <h3 className="text-center mt-2">Products you may like!</h3>

      <div className="d-flex flex-wrap justify-content-start">
        {filteredProducts.map((product) => (
          <div
            className="col-md-3 flex-shrink-0 my-2"
            key={product.id}
            onClick={() => handleCardClick(product)}
          >
            <Card
              category={product.category}
              title={product?product.title.slice(0, 20):"No Title."}
              id={product.id}
              image={product.image}
              price={product.price}
              rating={product.rating}
              showAlert={showAlert}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
