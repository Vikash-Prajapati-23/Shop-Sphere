import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddress } from "../../../../context/addressDetailsContext";
import { AddAddressButton } from "./AddAddressButton/AddAddressButton";
import { AddressForm } from "./AddressForm/AddressForm";
import { AddressList } from "./AddressList/AddressList";
import "./ManageAddress.css";

export const ManageAddresses = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsVisible(true);
    setIsSaving(true);
    const requiredFields = [
      "name",
      "mobile",
      "pincode",
      "locality",
      "address",
      "city",
      "state",
      "landmark",
      "addressType",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(`Please fill in the ${field} field.`);
        setIsSaving(false);
        return;
      }
    }

    try {
      let response, data;
      if (!formData._id) {
        response = await fetch("http://localhost:3001/api/auth/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
        data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          setSavedAddresses((prev) => [...prev, data.data]);
        }
      } else {
        response = await fetch(
          `http://localhost:3001/api/auth/address/${formData._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );
        data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          setSavedAddresses((prev) =>
            prev.map((address) =>
              address._id === formData._id ? data.data : address
            )
          );
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/auth/deleteAddress/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setSavedAddresses((prev) => prev.filter((addr) => addr._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
