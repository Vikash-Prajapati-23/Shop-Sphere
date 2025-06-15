import { useState, useEffect } from "react";
import { useFormData } from "../../../context/formDataContext";
import ChooseAddress from "./ChooseAddress/ChooseAddress";
import PlaceOrderPart from "./PlaceOrderPart/PlaceOrderPart";
import { api } from "../../../utils/api";

const CartSection = ({
  displayCart,
  selectedAddress,
  setSelectedAddress,
  isLoggedIn,
  handleProductDelete,
  handleProductIncrement,
  handleProductDecrement,
  handleAddToWishList,
  deliveryCost,
  handleCardClick,
}) => {
  const {
    savedAddresses,
    setSavedAddresses,
    formData,
    setFormData,
    isVisible,
    setIsVisible,
    handleInputChange,
    handleSave,
    isSaving,
  } = useFormData();

  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [editAddressById, setEditAddressById] = useState(null);

  const visibleAddress = showAll ? savedAddresses : savedAddresses.slice(0, 3);

  const refreshAddresses = async () => {
    try {
      const res = await fetch(api("/api/auth/getAddresses"), {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSavedAddresses([...data.addresses] || []);
      }
    } catch (err) {
      console.error("Failed to refresh addresses", err);
    }
  };

  const handleSaveAndRefresh = async (e) => {
    await handleSave(e);
    await refreshAddresses();
    setEditAddressById(null);
    setIsVisible(false);
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
    handleSaveAndRefresh,
    isSaving,
    isLoggedIn,
  };

  const placeOrderProps = {
    displayCart,
    handleCardClick,
    setIsPlaceOrder,
    selectedAddress,
    setSelectedAddress,
    isLoggedIn,
    deliveryCost,
    handleProductDelete,
    handleAddToWishList,
    handleProductIncrement,
    handleProductDecrement,
    savedAddresses,
  };

  return (
    <section className="section-part my-4">
      {!isPlaceOrder ? (
        <PlaceOrderPart {...placeOrderProps} />
      ) : (
        <ChooseAddress {...addressProps} />
      )}
    </section>
  );
};

export default CartSection;
