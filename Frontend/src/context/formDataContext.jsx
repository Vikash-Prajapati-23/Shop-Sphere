// src/context/formDataContext.js
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
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
    <FormDataContext.Provider
      value={{
        setSavedAddresses,
        savedAddresses,
        formData,
        setFormData,
        isVisible,
        setIsVisible,
        isSaving,
        setIsSaving,
        handleInputChange,
        handleDelete,
        handleSave,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
