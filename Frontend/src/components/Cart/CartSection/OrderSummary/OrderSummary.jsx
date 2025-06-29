import Button from "../../../Button/Button";
import "../CartSection.css";

const OrderSummary = ({
  name,
  email,
  isLoggedIn,
  currentIndex,
  setCurrentIndex,
  selectedAddress,
  displayCart,
  deliveryCost,
  handleProductDecrement,
  handleProductIncrement,
  handleAddToWishList,
  handleProductDelete,
}) => {
  return (
    <div className="">
      {/* Login Details...  */}
      <div className="bg-white mb-3 p-1 ps-4 py-2 bg-primary box-shadow-heads">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-3 text-size-b">
            <div className="all-addresses-checkout-index bg-light text-primary">
              {currentIndex - 2}
            </div>
            <div>
              <span className="text-secondary fw-bold text-size-b">LOGIN</span>
              <i className="fa-solid fa-check text-primary ms-2"></i>
            </div>
          </div>
        </div>

        <div className="ordersummary-head mt-2">
          <span className="me-2 head-text-size"> {name} </span>
          <span> {selectedAddress.mobile} </span>
        </div>
      </div>

      {/* Delivery details...  */}
      <div className="d-flex justify-content-between align-items-center bg-white mb-3 p-1 ps-4 py-2 bg-primary box-shadow-heads">
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="all-addresses-checkout-index bg-light text-primary">
                {currentIndex - 1}
              </div>
              <div>
                <span className="text-secondary fw-bold text-size-b">DELIVERY ADDRESS</span>
                <i className="fa-solid fa-check text-primary ms-2"></i>
              </div>
            </div>
          </div>

          <div className="ordersummary-head mt-2">
            <span className="me-2 head-text-size"> {selectedAddress.name} </span>
            <span> {selectedAddress.address} </span>
          </div>
        </div>

        <Button
          onClick={() => setCurrentIndex(2)}
          btnName="CHANGE"
          className="fw-bold px-5 py-2 me-3 change-btn"
        />
      </div>

      {/* Make this ul a separate component --->> Have to do it later. */}
      <ul className="ul-cart-list pt-2">
        <h4 className="fw-bold bg-primary text-white mb-0 py-2 px-4 text-size-b">
          {currentIndex} ORDER SUMMARY
        </h4>
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

      <div className="cart-summary d-flex justify-content-between mt-2">
        <p className="mt-2 continueEmail-text-size text-secondary">
          Order confirmation email will be sent to  
          <span className="text-black ms-2">{email}</span>
        </p>
        <Button
          className="fw-bold place-order-btn"
          onClick={() => setCurrentIndex(4)}
          btnName={"CONTINUE"}
        />
      </div>

      <div className="fw-bold bg-white my-2 p-1 ps-4 py-3 bg-primary">
        <div className="d-flex align-items-center gap-3">
          <div className="all-addresses-checkout-index bg-light text-primary">
            {currentIndex + 1}
          </div>
          <div>
            <span className="text-secondary">PAYMENT OPTIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
