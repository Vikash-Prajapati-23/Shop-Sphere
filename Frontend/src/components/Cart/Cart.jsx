import "./Style/Cart.css";
import "../Dashboard/ProfileNevigate/ManageAddresses/ManageAddresses";
import CartLayoutContainer from "./CartLayoutContainer/CartLayoutContainer";
import { useCartData } from "../../context/allCartData";

const Cart = ({ handleWishList, name, email, platformFee, deliveryCost }) => {
  const { cart, guestCart, isLoggedIn } = useCartData();

  const displayCart = isLoggedIn ? cart : guestCart;

  return (
    <div className="main-cart">
      {displayCart.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center gap-5 py-4 w-100">
          <img src="./images/empty-cart.png" alt="Empty Cart" />
          <h4>Your cart is empty.!</h4>
        </div>
      ) : (
        <CartLayoutContainer
          name={name}
          email={email}
          deliveryCost={deliveryCost}
          platformFee={platformFee}
          displayCart={displayCart}
          handleWishList={handleWishList}
        />
      )}
    </div>
  );
};

export default Cart;
