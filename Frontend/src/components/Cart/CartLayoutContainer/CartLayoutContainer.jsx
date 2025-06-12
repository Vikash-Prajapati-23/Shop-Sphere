import { useFormData } from "../../../context/formDataContext";
import CartAside from "../CartAside/CartAside";
import CartSection from "../CartSection/CartSection";

const CartLayoutContainer = (props) => {
  const { savedAddresses, setSavedAddresses } = useFormData();
  const {
    deliveryCost,
    platformFee,
    cart,
    handleCardClick,
    displayCart,
    selectedAddress,
    isLoggedIn,
    handleProductDelete,
    handleProductIncrement,
    handleProductDecrement,
    handleAddToWishList,
  } = props;

  return (
    <div className="cart-layout-container">
      <CartSection
        {...props}
        allAddresses={savedAddresses}
        setAllAddresses={setSavedAddresses}
      />
      <CartAside
        displayCart={displayCart}
        cart={cart}
        platformFee={platformFee}
        deliveryCost={deliveryCost}
      />
    </div>
  );
};

export default CartLayoutContainer;
