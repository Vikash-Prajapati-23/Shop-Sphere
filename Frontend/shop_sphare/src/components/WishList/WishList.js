import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "./Style/WishList.css";
import Card from '../Card/Card'

const WishList = () => {

  const [wishlistProduct, setWishlistProduct] = useState(null);
  const { id } = useParams(); // Added: Extract the product ID from the URL.;

  // Added: Function to fetch product details using the extracted ID.
  const fetchWishlistProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setWishlistProduct(data); // Update the product state with fetched data.
  };

  useEffect(() => {
    fetchWishlistProduct();
  }, []);

  return (
    <div className="card m-3">
      <h3>Your Wishlist</h3>
      <div className="card">
        {wishlistProduct.map((product) => {
          <div className="card" key={product.id}>
            <Card 
              title={product?product.title.slice(0, 20):"No Title."}
              id={product.id}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          </div>
        })}
      </div>

    </div>
  );
};

export default WishList;
