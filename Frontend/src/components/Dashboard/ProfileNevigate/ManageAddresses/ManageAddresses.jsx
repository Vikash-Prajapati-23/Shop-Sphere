import { useEffect, useState } from "react";
import { useAddress } from "../../../../context/addressDetailsContext";
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
    setIsSaving,
    isSaving,
    isVisible,
    setIsVisible,
    savedAddresses,
    setSavedAddresses,
  } = useFormData();
  const { selectedAddress, setSelectedAddress } = useAddress();

  useEffect(() => {
    const showAddress = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/savedAddress",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) setSavedAddresses(data.addresses || []);
      } catch (error) {
        console.error("Server error.", error);
      }
    };
    showAddress();
  }, []);

  return (
    <div className="address-area">
      <h4 className="mb-4">Manage Addresses</h4>
      {!isVisible ? (
        <AddAddressButton setIsVisible={setIsVisible} />
      ) : (
        <AddressForm
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          setIsVisible={setIsVisible}
          isSaving={isSaving}
        />
      )}
      <AddressList
        savedAddresses={savedAddresses}
        setFormData={setFormData}
        setIsVisible={setIsVisible}
        handleDelete={handleDelete}
      />
    </div>
  );
};
