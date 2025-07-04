import "./Style/Cart.css";
import "../Dashboard/ProfileNevigate/ManageAddresses/ManageAddresses";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CartLayoutContainer from "./CartLayoutContainer/CartLayoutContainer";
import { useCartData } from "../../context/allCartData";

const Cart = ({
  handleWishList,
  name,
  email,
  platformFee,
  deliveryCost,
}) => {
  const navigate = useNavigate();
  const {
    cart,
    guestCart,
    isLoggedIn
  } = useCartData();

  const handleCardClick = (product) => {
    if (product && product.id) {
      navigate(`/SingleProduct/${product.id}`);
    } else {
      toast.error("Product ID not found");
    }
  };

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
          handleCardClick={handleCardClick}
          displayCart={displayCart}
          handleWishList={handleWishList}
        />
      )}
    </div>
  );
};

export default Cart;
