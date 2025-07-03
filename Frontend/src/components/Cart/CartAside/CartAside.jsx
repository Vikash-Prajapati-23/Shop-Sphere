import { useCartData } from "../../../context/allCartData";

const CartAside = ({ deliveryCost, platformFee, displayCart }) => {
  const { cart } = useCartData();

  return (
    <div className="aside-part fixed">
      <aside className=" bg-white">
        <div className="borders p-3 fw-bold text-sizes-big">PRICE DETAILS</div>
        <div className="p-3 text-sizes">
          <div className="d-flex justify-content-between pb-2">
            <span>
              Price <span>({cart.length} items)</span>
            </span>
            <span className="">
              ₹
              {displayCart
                .reduce((total, product) => {
                  const qty = product.quantity || 1;
                  return total + product.price * qty;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span>Discount </span> <span className=" text-success">0</span>
          </div>
          <div className="d-flex justify-content-between py-2">
            <span>Platform fee</span> <span>₹{platformFee} </span>
          </div>
          <div className="d-flex justify-content-between pt-2 pb-3 borders">
            <span>Delivery Charges </span>
            <span>
              <span className="me-1 text-secondary text-decoration-line-through">
                ₹{deliveryCost * cart.length}
              </span>
              <span className="text-success">Free</span>
            </span>
          </div>
          <div className="d-flex justify-content-between py-3 fw-bold borders">
            <span>Total Amount</span>
            <span>
              ₹
              {(
                displayCart.reduce((total, product) => {
                  const qty = product.quantity || 1;
                  return total + product.price * qty;
                }, 0) + platformFee
              ).toFixed(2)}
            </span>
          </div>
          <div className="d-flex justify-content-between fw-semibold pt-2 text-success text-sizes">
            <div>You will save amount on this order.</div>
          </div>
        </div>
      </aside>
      <div className="aside-below text-sizes">
        <i className="bi bi-shield-check me-3 aside-below-icon"></i>
        <p className="text-secondary aside-below-text mt-3 text-sizes">
          Safe and Secure Payments.Easy returns.100% Authentic products.
        </p>
      </div>
    </div>
  );
};

export default CartAside;
