import { useNavigate } from "react-router-dom";
import Button from "../../../Button/Button";
import CartAddressBlock from "../../CartAddressBlock/CartAddressBlock";
import toast from "react-hot-toast";
import "./PlaceOrderPart.css";
import { useCartData } from "../../../../context/allCartData";

const PlaceOrderPart = ({
  isLoggedIn,
  displayCart,
  deliveryCost,
  handleCardClick,
  handleWishList,
  setCurrentIndex,
}) => {
  const navigate = useNavigate();
  const {
    handleDecrement,
    handleIncrement,
    handleDelete,
  } = useCartData();

  const handleProductDelete = async (productId) => {
    handleDelete(productId);
  };

  const handleProductIncrement = async (productId) => {
    handleIncrement(productId);
  };

  const handleProductDecrement = async (productId) => {
    handleDecrement(productId);
  };

  const handleAddToWishList = (product) => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast.success("Please log in to add items to your wishlist");
      return;
    }
    handleWishList(product);
    toast.success("Added to wishlist!");
    handleDelete(product._id);
  };

  const handleNavigate = () => {
    if (!isLoggedIn) {
      navigate("/LoginSignup");
      toast("Please login first to place orders.!");
    } else {
      setCurrentIndex(2);
    }
  };

  return (
    <div className="placeorder-part">
      <CartAddressBlock
        isLoggedIn={isLoggedIn}
      />

      <ul className="ul-cart-list pt-2">
        {displayCart.map((product) => (
          <li
            style={{ backgroundColor: "white" }}
            className="cart-list"
            key={product._id || product.id}
          >
            <div className="middle-part">
              <div className="product mb-2">
                <div className="product-details">
                  <img
                    src={product.image}
                    className="cart-product-img"
                    alt={product.title}
                    onClick={() => handleCardClick(product)}
                  />
                </div>

                <div className="product-details-wide">
                  <div>
                    <p className="product-title text-sizes-big">
                      {product.title?.slice(0, 51) || "No Title"}...
                    </p>
                    <p className="product-title-rest text-sizes">
                      {product.title?.slice(51) || ""}
                    </p>
                  </div>

                  <div className="fw-bold mb-2 text-sizes">
                    ₹{product.price}
                  </div>
                  <div className="d-flex align-items-center text-sizes">
                    <p>
                      <span className="fw-bold" style={{ color: "gold" }}>
                        ★{" "}
                      </span>
                      <span className="me-3">{product.rating?.rate}</span>
                    </p>
                    <p className="fw-bold rating-font-size text-sizes">
                      Reviews {product.rating?.count}
                    </p>
                  </div>
                </div>

                <div className="product-details-semiwide sc-delivery text-sizes">
                  Delivery by Sunday, June 17 | Delivery cost
                  <span className="text-decoration-line-through mx-2">
                    ₹{deliveryCost}
                  </span>
                  <span className="text-success text-sizes">Free</span>
                </div>
              </div>
              <div>
                <div className="buttons text-sizes">
                  {isLoggedIn && (
                    <div className="inc-dec-btn">
                      <Button
                        onClick={() => handleProductDecrement(product._id)}
                        disabled={product.quantity <= 1}
                        className="fw-bold quantity-btns"
                        btnName={"-"}
                      />
                      <span className="mx-1 fw-semibold product-quantity ">
                        {product.quantity}
                      </span>
                      <Button
                        onClick={() => handleProductIncrement(product._id)}
                        className="quantity-btns-inc fw-bold"
                        btnName={"+"}
                      />
                    </div>
                  )}
                  <div className="btns-lower">
                    <Button
                      className="btn cart-btns fw-bold ms-lg-4 ms-md-0 px-md-2 text-sizes"
                      onClick={() => handleAddToWishList(product)}
                      btnName={"MOVE TO WISHLIST"}
                    />
                    <Button
                      onClick={() =>
                        handleProductDelete(product._id || product.id)
                      }
                      className="btn cart-btns fw-bold text-sizes"
                      btnName={"REMOVE"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total d-flex justify-content-end">
        <Button
          className="fw-bold place-order-btn text-sizes"
          onClick={handleNavigate}
          btnName={"PLACE ORDER"}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPart;
