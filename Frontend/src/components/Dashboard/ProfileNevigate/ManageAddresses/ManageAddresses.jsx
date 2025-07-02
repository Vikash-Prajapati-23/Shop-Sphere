import { useEffect, useState } from "react";
import { useFormData } from "../../../../context/formDataContext";
import { AddAddressButton } from "./AddAddressButton/AddAddressButton";
import { AddressForm } from "./AddressForm/AddressForm";
import { AddressList } from "./AddressList/AddressList";
import "./ManageAddress.css";

export const ManageAddresses = () => {
  const {
    formData,
    setFormData,
    handleSave,
    handleDelete,
    handleInputChange,
    isSaving,
    isVisible,
    setIsVisible,
    savedAddresses,
    setSavedAddresses,
  } = useFormData();

  useEffect(() => {
    const showAddress = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/savedAddress`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) setSavedAddresses(data.addresses || []);
      } catch (error) {
        if (process.env.REACT_APP_NODE_ENV !== "production") {
          console.error(error);
        }
      }
    };
    showAddress();
  }, []);

  // Function to refresh addresses from backend
  const refreshAddresses = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/savedAddress`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSavedAddresses(data.addresses || []);
      }
    } catch (err) {
      if (process.env.REACT_APP_NODE_ENV !== "production") {
        console.error(err);
      }
    }
  };

  // Wrap handleSave to refresh addresses after save
  const handleSaveAndRefresh = async (e) => {
    await handleSave(e);
    await refreshAddresses();
    setIsVisible(false);
  };

  return (
    <div className="address-area">
      <h4 className="mb-4 manage-add-address manage-address-size">Manage Addresses</h4>
      {!isVisible ? (
        <AddAddressButton setIsVisible={setIsVisible} />
      ) : (
        <AddressForm
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleSave={handleSaveAndRefresh}
          setIsVisible={setIsVisible}
          isSaving={isSaving}
        />
      )}
      <AddressList
        savedAddresses={savedAddresses}
        setFormData={setFormData}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleDelete={(id) => handleDelete(id, refreshAddresses)}
      />
    </div>
  );
};
