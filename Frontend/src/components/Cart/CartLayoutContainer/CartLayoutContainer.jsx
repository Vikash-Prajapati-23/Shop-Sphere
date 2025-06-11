import CartAside from "../CartAside/CartAside";
import CartSection from "../CartSection/CartSection";

const CartLayoutContainer = ({
  deliveryCost,
  platformFee,
  cart,
  handleCardClick,
  displayCart,
  selectedAddress,
  allAddresses,
  setSelectedAddress,
  isLoggedIn,
  handleProductDelete,
  handleProductIncrement,
  handleProductDecrement,
  handleAddToWishList,
}) => {
  return (
    <div className="cart-layout-container">
      <CartSection
        displayCart={displayCart}
        selectedAddress={selectedAddress}
        allAddresses={allAddresses}
        setSelectedAddress={setSelectedAddress}
        isLoggedIn={isLoggedIn}
        handleCardClick={handleCardClick}
        handleProductDelete={handleProductDelete}
        handleProductIncrement={handleProductIncrement}
        handleProductDecrement={handleProductDecrement}
        handleAddToWishList={handleAddToWishList}
      />

      {/* <div className="aside-part my-4 fixed"> */}
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
