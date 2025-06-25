import { useState } from "react";
import { useFormData } from "../../../context/formDataContext";
import CartAside from "../CartAside/CartAside";
import PlaceOrderPart from "../CartSection/PlaceOrderPart/PlaceOrderPart";
import ChooseAddress from "../CartSection/ChooseAddress/ChooseAddress";
import OrderSummary from "../CartSection/OrderSummary/OrderSummary";
import PaymentGateway from "../CartSection/PaymentGateway/PaymentGateway";

const CartLayoutContainer = ({
  handleProductIncrement,
  handleProductDecrement,
  handleAddToWishList,
  handleProductDelete,
  setSelectedAddress,
  selectedAddress,
  displayCart,
  isLoggedIn,
  deliveryCost,
  platformFee,
  setCart,
  cart,
  name,
  email,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const { savedAddresses, setSavedAddresses } = useFormData();
  const [showAll, setShowAll] = useState(false);
  const [editAddressById, setEditAddressById] = useState(null);
  const {
    formData,
    setFormData,
    isVisible,
    setIsVisible,
    handleInputChange,
    handleSave,
    isSaving,
  } = useFormData();

  const visibleAddress = showAll ? savedAddresses : savedAddresses.slice(0, 3);

  const placeOrderProps = {
    displayCart,
    selectedAddress,
    setSelectedAddress,
    deliveryCost,
    handleProductDelete,
    handleAddToWishList,
    handleProductIncrement,
    handleProductDecrement,
    savedAddresses,
  };

  const addressProps = {
    editAddressById,
    setEditAddressById,
    visibleAddress,
    isVisible,
    setIsVisible,
    showAll,
    setShowAll,
    savedAddresses,
    selectedAddress,
    setSelectedAddress,
    formData,
    setFormData,
    handleSave,
    handleInputChange,
    isSaving,
    isLoggedIn,
  };

  const refreshAddresses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/getAddresses`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSavedAddresses([...data.addresses] || []);
      }
    } catch (err) {
      if (process.env.REACT_APP_NODE_ENV !== 'production') {
    console.error(err);
  }
    }
  };

  const handleSaveAndRefresh = async (e) => {
    await handleSave(e);
    await refreshAddresses();
    setEditAddressById(null);
    setIsVisible(false);
  };

  return (
    <div className="cart-layout-container">
      <section className="section-part my-4">
        {currentIndex === 1 && (
          <PlaceOrderPart
            {...placeOrderProps}
            isLoggedIn={isLoggedIn}
            allAddresses={savedAddresses}
            setAllAddresses={setSavedAddresses}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        {currentIndex === 2 && (
          <ChooseAddress
            handleSaveAndRefresh={handleSaveAndRefresh}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            {...addressProps}
            name={name}
          />
        )}
        {currentIndex === 3 && (
          <OrderSummary
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isLoggedIn={isLoggedIn}
            {...placeOrderProps}
            name={name}
            email={email}
          />
        )}
        {currentIndex === 4 && (
          <PaymentGateway
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isLoggedIn={isLoggedIn}
            handleProductDelete={handleProductDelete}
            {...placeOrderProps}
            name={name}
            email={email}
            cart={cart}
            setCart={setCart}
            user={{
              name: name,
              email: email,
              mobile: selectedAddress?.mobile || "9999999999",
              _id: selectedAddress?.userId || selectedAddress?.user_id || "",
            }}
          />
        )}
      </section>
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
