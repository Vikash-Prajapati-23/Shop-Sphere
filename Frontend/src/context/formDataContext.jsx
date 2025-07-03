import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const FormDataContext = createContext();
// I use an arrow function here because I want to create a function that returns the value from useContext(FormDataContext) when called.
export const useFormData = () => useContext(FormDataContext);
// Another way of doing this is :-
// export function useFormData() {
//   return useContext(FormDataContext);
// }

export const FormDataProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
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
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/savedAddress`,
        {
          credentials: "include",
        }
      );
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
        response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/address`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch(
          // This is for editting the form.
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/address/${formData._id}`,
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
        await refreshAddresses();
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
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/deleteAddress/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        await refreshAddresses(); // Also refresh after delete
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
        selectedAddress,
        setSelectedAddress,
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
