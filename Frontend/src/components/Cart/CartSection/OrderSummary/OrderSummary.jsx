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
      <div className="bg-white mb-3 p-1 ps-md-4 ps-2 py-2 bg-primary box-shadow-heads">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center  gap-md-3 gap-1 text-size-b">
            <div className="all-addresses-checkout-index bg-light text-primary">
              {currentIndex - 2}
            </div>
            <div>
              <span className="text-secondary fw-bold text-size-b">LOGIN</span>
              <i className="fa-solid fa-check text-primary ms-md-2 ms-1"></i>
            </div>
          </div>
        </div>

        <div className="ordersummary-head mt-2 text-size-b">
          <span className="me-2 head-text-size"> {name} </span>
          <span> {selectedAddress.mobile} </span>
        </div>
      </div>

      {/* Delivery details...  */}
      <div className="d-flex justify-content-between align-items-center bg-white mb-3 p-1 ps-md-4 ps-2 py-2 bg-primary box-shadow-heads">
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-md-3 gap-1">
              <div className="all-addresses-checkout-index bg-light text-primary text-size-b">
                {currentIndex - 1}
              </div>
              <div>
                <span className="text-secondary fw-bold text-size-b">DELIVERY ADDRESS</span>
                <i className="fa-solid fa-check text-primary text-size-b ms-md-2 ms-1"></i>
              </div>
            </div>
          </div>

          <div className="ordersummary-head mt-2 text-size-b">
            <span className="me-2 head-text-size "> {selectedAddress.name} </span>
            <span> {selectedAddress.address} </span>
          </div>
        </div>

        <Button
          onClick={() => setCurrentIndex(2)}
          btnName="CHANGE"
          className="fw-bold px-md-5 py-2 me-3 change-btn text-size-s"
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
            className="cart-list m-0 p-md-4 "
            key={product._id || product.id}
          >
            <div className="">
              <div className="product">
                <div className="product-details">
                  <img
                    src={product.image}
                    className="cart-product-img"
                    alt={product.title}
                  />
                </div>

                <div className="py-md-1 py-0 product-details-wide">
                  <div>
                    <p className="product-title text-size-b">
                      {product.title?.slice(0, 51) || "No Title"}...
                    </p>
                    <p className="product-title-rest">
                      {product.title?.slice(51) || ""}
                    </p>
                  </div>

                  <div className="fw-bold mb-2 text-size-b">₹{product.price}</div>
                  <div className="d-flex align-items-center text-size-b">
                    <p>
                      <span className="fw-bold" style={{ color: "gold" }}>
                        ★{" "}
                      </span>
                      <span className="me-3">{product.rating?.rate}</span>
                    </p>
                    <p className="fw-bold rating-font-size  text-size-b">
                      Reviews {product.rating?.count}
                    </p>
                  </div>
                </div>

                <div className="Order-summary-Delivery-info text-size-s">
                  Delivery by Sunday, June 17 | Delivery cost
                  <span className="text-decoration-line-through mx-2">
                    ₹{deliveryCost}
                  </span>
                  <span className="text-success">Free</span>
                </div>
              </div>
              <div>
                <div className="order-summary-btns">
                  {isLoggedIn && (
                    <div className="d-flex me-3 me-md-1 text-size-b">
                      <Button
                        onClick={() => handleProductDecrement(product._id)}
                        disabled={product.quantity <= 1}
                        className="fw-bold quantity-btns text-black"
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
                    </div>
                  )}
                  <Button
                    className="btn fw-bold ms-md-4 ms-0 px-1 text-size-s"
                    onClick={() => handleAddToWishList(product)}
                    btnName={"MOVE TO WISHLIST"}
                  />
                  <Button
                    onClick={() =>
                      handleProductDelete(product._id || product.id)
                    }
                    className="btn fw-bold text-size-s px-1"
                    btnName={"REMOVE"}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-summary d-flex justify-content-between mt-2">
        <p className="m-auto continueEmail-text-size text-secondary text-size-s">
          Order confirmation email will be sent to  
          <span className="text-black ms-2">{email}</span>
        </p>
        <Button
          className="fw-bold place-order-btn text-size-b"
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
