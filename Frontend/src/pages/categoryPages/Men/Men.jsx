import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/Men.css";
import Card from "../../../components/Card/Card";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";
import { useCartData } from "../../../context/allCartData";

const Men = ({ handleWishList, query }) => {
  const { isLoggedIn, handleCartAddition } = useCartData();
  const [menProduct, setMenProduct] = useState([]);
  const navigate = useNavigate();
  const { categorySlug } = useParams();

  const getProductByCategory = async (categorySlug) => {
    try {
      const url = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/products/category/${categorySlug}`
      );
      const data = await url.json();

      if (Array.isArray(data.categoryFound)) {
        setMenProduct(data.categoryFound);
      } else {
        setMenProduct([]);
        toast.error("Unexpected error while fetching products.");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      setMenProduct([]);
      toast.error("Failed to load category products.");
    }
  };

  useEffect(() => {
    getProductByCategory(categorySlug);
  }, [categorySlug]);

  const handleWishlist = (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
  };

  const handleCardClick = (product) => {
    if (product && product.productId) {
      navigate(`/SingleProduct/${product.productId}`);
    } else {
      toast.error("Product ID not found");
    }
  };

  if (!menProduct) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="catagory-page">
      <div className="">
        <h3 className="text-center m-md-2">
          {categorySlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h3>
        <div className="card-location">
          {menProduct
            .filter((product) => product.title.toLowerCase().includes(query))
            .map((product) => (
              <div
                className="col-lg-4 col-md-6 col-5 flex-shrink-0 my-2"
                key={product.id || product._id || product.productId}
                onClick={() => handleCardClick(product)}
              >
                <Card
                  {...product}
                  handleAddToCart={() => handleCartAddition(product)}
                  handleWishlist={() => handleWishlist(product)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Men;
