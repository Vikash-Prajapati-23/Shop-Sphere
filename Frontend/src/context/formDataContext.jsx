import { createContext, useContext, useState, useEffect } from "react";
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

  const refreshAddresses = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/savedAddress", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setSavedAddresses(data.addresses);
      }
    } catch (err) {
      toast.error("Could not refresh addresses");
    }
  };

  useEffect(() => {
    refreshAddresses();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
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
        // This is for creating a new form.
        response = await fetch("http://localhost:3001/api/auth/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(
          // This is for editting the form.
          `http://localhost:3001/api/auth/address/${formData._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );
      }

      data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsVisible(false);
        setFormData({
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
        await refreshAddresses(); // 👈 KEY FIX
      } else {
        toast.error(data.message);
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
        await refreshAddresses(); // 👈 Also refresh after delete
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
        savedAddresses,
        setSavedAddresses,
        formData,
        setFormData,
        isVisible,
        setIsVisible,
        isSaving,
        setIsSaving,
        handleInputChange,
        handleDelete,
        handleSave,
        refreshAddresses,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
