import "../../components/Cart/Style/Cart.css";
import "./MyOrders.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const MyOrders = ({ deliveryCost, userId }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/payments/fetch-order-details/user/${userId}`,
        { credentials: "include", method: "GET" }
      );
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
        // toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      if (process.env.REACT_APP_NODE_ENV !== 'production') {
    console.error(error);
  }
    }
  };
  useEffect(() => {
    if (userId) {
      fetchOrder();
    }
  }, [userId]); // Run only when userId is available

  return (
    <div className="main-order-page">
      <div className="order-page">
        <div className="order-aside">
          <aside className="order-aside">
            <div className="bg-white ">
              <h5 className="borders p-3 fw-bold">FILTERS</h5>
              <div className="px-3 py-2">
                <div className="pb-2 fw-bold aside-cursor">
                  <span>ORDER STATUS</span>
                </div>
                <div className="pb-2 aside-cursor">
                  <span>On the Way</span>
                </div>
                <div className=" py-2 aside-cursor">Delivered</div>
                <div className=" py-2 aside-cursor">Canceled</div>
                <div className="pt-2 aside-cursor borders">Returned</div>
                <div className="fw-bold pt-3">
                  <span>Order TIME</span>
                </div>
                <div className="pt-2 aside-cursor">Last 30 days</div>
                <div className="pt-2 aside-cursor">2025</div>
                <div className="pt-2 aside-cursor">2024</div>
                <div className="pt-2 aside-cursor">2023</div>
              </div>
            </div>
            <div className="aside-below">
              <i className="bi bi-shield-check me-3 aside-below-icon"></i>
              <p className="text-secondary aside-below-text mt-3">
                Safe and Secure Payments.Easy returns.100% Authentic products.
              </p>
            </div>
          </aside>
        </div>

        <ul className="ul-order-list bg-white">
          <h2 className="fw-bold mt-2 pt-2 mb-3">My Orders</h2>
          {orders && orders?.length > 0 ? (
            orders.map((order, index) => (
              <li key={index} className="order-list">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="mb-2 text-size-big">
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mb-3 fw-semibold text-size-big">
                      Order Total: ₹{order.totalAmount}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 fw-semibold text-size-big">
                      Payment Status: {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {/* Loop over products inside this order */}
                {order.products.map((product, i) => (
                  <div key={i} className="product-details">
                    <div className="product-img">
                      <img
                        src={product.image}
                        className="cart-product-img"
                        alt={product.title}
                      />
                    </div>

                    <div className="product-info">
                      <div>
                        <p className="product-title text-size-big">
                          {product.title?.slice(0, 51) || "No Title"}...
                        </p>
                        <p className="product-title-rest">
                          {product.title?.slice(51) || ""}
                        </p>
                      </div>

                      <div className="fw-bold mb-2 text-size-small">₹{product.price}</div>
                      <div className="mb-1 text-size-small">Qty: {product.quantity}</div>
                      <div className="d-flex align-items-center text-size-small">
                        <p>
                          <span className="fw-bold text-size-small" style={{ color: "gold" }}>
                            ★{" "}
                          </span>
                          <span className="me-3 text-size-small">{product.rating?.rate}</span>
                        </p>
                        <p className="fw-bold rating-font-size text-size-small">
                          Reviews {product.rating?.count}
                        </p>
                      </div>
                    </div>

                    <div className="product-details-semiwide delivery-info text-size-small">
                      Delivery by Sunday, June 21 | Delivery cost
                      <span className="text-decoration-line-through mx-2 text-size-small">
                        ₹{deliveryCost}
                      </span>
                      <span className="text-success text-size-small">Free</span>
                    </div>
                  </div>
                ))}
              </li>
            ))
          ) : (
            <p className="text-center text-secondary">No orders found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyOrders;
