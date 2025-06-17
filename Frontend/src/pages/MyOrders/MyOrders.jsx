import "../../components/Cart/Style/Cart.css";
import "./MyOrders.css";

const MyOrders = ({ cart, deliveryCost, platformFee, displayCart }) => {
  return (
    <div className="order-page my-2 mx-3 px-5 py-3">
      <div className="d-flex gap-3">
        <div className="order-aside">
          <aside className="order-aside">
            <aside className="bg-white ">
              <h5 className="borders p-3 fw-bold">FILTERS</h5>
              <div className="px-3 py-2">
                <div className="pb-2 fw-bold aside-cursor">
                  <span>
                    ORDER STATUS
                  </span>
                </div>
                <div className="pb-2 aside-cursor">
                  <span>
                    On the Way
                  </span>
                </div>
                <div className=" py-2 aside-cursor">
                  Delivered
                </div>
                <div className=" py-2 aside-cursor">
                  Canceled
                </div>
                <div className="pt-2 aside-cursor borders">
                 Returned
                </div>
                <div className="fw-bold pt-3">
                  <span>Order TIME</span>
                </div>
                <div className="pt-2 aside-cursor">
                  Last 30 days
                </div>
                <div className="pt-2 aside-cursor">
                  2025
                </div>
                <div className="pt-2 aside-cursor">
                  2024
                </div>
                <div className="pt-2 aside-cursor">
                  2023
                </div>
              </div>
            </aside>
            <div className="aside-below">
              <i className="bi bi-shield-check me-3 aside-below-icon"></i>
              <p className="text-secondary aside-below-text mt-3">
                Safe and Secure Payments.Easy returns.100% Authentic products.
              </p>
            </div>
          </aside>
        </div>

        <ul className="ul-cart-list ul-order-list pt-2 bg-white py-2 px-3 w-75">
          <h2 className="fw-bold mt-2 mb-4">My Orders</h2>
          {cart.map((product) => (
            <li
              style={{ backgroundColor: "white" }}
              className="cart-list order-list m-0 p-4 mb-3"
              key={product._id || product.id}
            >
              <div className="">
                <div className="mb-1 d-flex gap-5">
                  <div className="product-img m-0 p-0">
                    <img
                      src={product.image}
                      className="cart-product-img"
                      alt={product.title}
                      //   onClick={() => handleCardClick(product)}
                    />
                  </div>

                  <div className="product-info">
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

                  <div className="product-details-semiwide delivery-info">
                    Delivery by Sunday, June 17 | Delivery cost
                    <span className="text-decoration-line-through mx-2">
                      ₹{deliveryCost}
                    </span>
                    <span className="text-success">Free</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyOrders;
