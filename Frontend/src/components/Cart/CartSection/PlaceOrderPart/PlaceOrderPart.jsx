import { useNavigate } from "react-router-dom";
import Button from "../../../Button/Button";
import CartAddressBlock from "../../CartAddressBlock/CartAddressBlock";
import toast from "react-hot-toast";

const PlaceOrderPart = ({
  selectedAddress,
  setSelectedAddress,
  isLoggedIn,
  displayCart,
  deliveryCost,
  handleCardClick,
  handleProductDelete,
  handleAddToWishList,
  handleProductIncrement,
  handleProductDecrement,
  savedAddresses,
  setCurrentIndex,
}) => {
  const nevigate = useNavigate();

  const handleNevigate = () => {
    if (!isLoggedIn) {
      nevigate("/LoginSignup");
      toast("Please login first to place orders.!")
    } else {
    setCurrentIndex(2);
  }
  };

  return (
    <div>
      <CartAddressBlock
        selectedAddress={selectedAddress}
        savedAddresses={savedAddresses}
        setSelectedAddress={setSelectedAddress}
        isLoggedIn={isLoggedIn}
      />

      <ul className="ul-cart-list pt-2">
        {displayCart.map((product) => (
          <li
            style={{ backgroundColor: "white" }}
            className="cart-list m-0 p-4"
            key={product._id || product.id}
          >
            <div className="justify-content-between align-items-center">
              <div className="product mb-1">
                <div className="product-details m-0 p-0">
                  <img
                    src={product.image}
                    className="cart-product-img"
                    alt={product.title}
                    onClick={() => handleCardClick(product)}
                  />
                </div>

                <div className="product-details-wide">
                  <div>
                    <p className="product-title">
                      {product.title?.slice(0, 51) || "No Title"}...
                    </p>
                    <p className="product-title-rest">
                      {product.title?.slice(51) || ""}
                    </p>
                  </div>

                  <div className="fw-bold mb-2">₹{product.price}</div>
                  <div className="d-flex align-items-center">
                    <p>
                      <span className="fw-bold" style={{ color: "gold" }}>
                        ★{" "}
                      </span>
                      <span className="me-3">{product.rating?.rate}</span>
                    </p>
                    <p className="fw-bold rating-font-size">
                      Reviews {product.rating?.count}
                    </p>
                  </div>
                </div>

                <div className="product-details-semiwide">
                  Delivery by Sunday, June 17 | Delivery cost
                  <span className="text-decoration-line-through mx-2">
                    ₹{deliveryCost}
                  </span>
                  <span className="text-success">Free</span>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  {isLoggedIn && (
                    <>
                      <Button
                        onClick={() => handleProductDecrement(product._id)}
                        disabled={product.quantity <= 1}
                        className="fw-bold quantity-btns"
                        btnName={"-"}
                      />
                      <span className="mx-1 fw-bold product-quantity">
                        {product.quantity}
                      </span>
                      <Button
                        onClick={() => handleProductIncrement(product._id)}
                        className="quantity-btns-inc fw-bold"
                        btnName={"+"}
                      />
                    </>
                  )}
                  <Button
                    className="btn cart-btns fw-bold ms-4"
                    onClick={() => handleAddToWishList(product)}
                    btnName={"MOVE TO WISHLIST"}
                  />
                  <Button
                    onClick={() =>
                      handleProductDelete(product._id || product.id)
                    }
                    className="btn cart-btns fw-bold"
                    btnName={"REMOVE"}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total d-flex justify-content-end">
        <Button
          className="fw-bold place-order-btn"
          onClick={handleNevigate}
          btnName={"PLACE ORDER"}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPart;
