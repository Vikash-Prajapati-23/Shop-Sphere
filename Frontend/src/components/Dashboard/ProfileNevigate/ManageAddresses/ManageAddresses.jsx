import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import "./ManageAddress.css";
import { useAddress } from "../../../../context/addressDetailsContext";

export const ManageAddresses = () => {
  const [isVisible, setIsvisible] = useState(false);
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
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
        if (response.ok) {
          setSavedAddresses(data.addresses || []);
        }
      } catch (error) {
        console.error(error, "Server error.");
      }
    };

    showAddress();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsvisible(true);
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
        // Add new address
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
        // Edit existing address
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
      toast.error(
        error,
        "Something went wrong while updating the address. Please try again later."
      );
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
        // Remove the deleted address from the UI
        setSavedAddresses((prev) => prev.filter((addr) => addr._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error,
        "Something went wrong while deleting the address. Please try again later."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="address-area">
      <h4 className="mb-4">Manage Addresses</h4>

      <div className="">
        {!isVisible ? (
          <button
            onClick={() => setIsvisible(true)}
            className="add-address-btn fw-semibold"
          >
            <span className="me-4">&#10133;</span> ADD A NEW ADDRESS
          </button>
        ) : (
          <div className="add-address ">
            <p className="fw-semibold mb-4">ADD A NEW ADDRESS</p>

            <form action="" className="form-area">
              {/* Row 1 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text" htmlFor="name">
                    Name
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="name"
                    value={formData.name}
                    className="form-input"
                    id="name"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="label-text" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="mobile"
                    value={formData.mobile}
                    className="form-input"
                    id="mobile"
                    type="text"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text" htmlFor="pincode">
                    Pincode
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="pincode"
                    value={formData.pincode}
                    className="form-input"
                    id="pincode"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="label-text" htmlFor="locality">
                    Locality
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="locality"
                    value={formData.locality}
                    className="form-input"
                    id="locality"
                    type="text"
                  />
                </div>
              </div>

              {/* Address (wider field) */}
              <div className="form-row address-row">
                <div className="form-group full-width">
                  <label className="label-text" htmlFor="address ">
                    Address
                  </label>
                  <textarea
                    required
                    onChange={handleInputChange}
                    name="address"
                    value={formData.address}
                    className="form-input-address"
                    id="address"
                    type="text"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text" htmlFor="city">
                    City
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="city"
                    value={formData.city}
                    className="form-input"
                    id="city"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="label-text" htmlFor="state">
                    State
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="state"
                    value={formData.state}
                    className="form-input"
                    id="state"
                    type="text"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text" htmlFor="landmark">
                    Landmark
                  </label>
                  <input
                    required
                    onChange={handleInputChange}
                    name="landmark"
                    value={formData.landmark}
                    className="form-input"
                    id="landmark"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="label-text" htmlFor="alternatePhone">
                    Alternate Phone
                  </label>
                  <input
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="form-input"
                    id="alternate"
                    type="text"
                  />
                </div>
              </div>

              {/* Row 5 */}
              <span className="mt-2 ms-3 address-type-size">Address Type</span>
              <div className="d-flex gap-5 mb-3 ms-3">
                <div className="d-flex gap-3">
                  <input
                    name="addressType"
                    value="Home"
                    checked={formData.addressType === "Home"}
                    className="form-input"
                    id="home"
                    type="radio"
                    onChange={handleInputChange}
                  />
                  <span className="text-black">Home</span>
                </div>
                <div className="d-flex gap-3">
                  <input
                    name="addressType"
                    value="Work"
                    checked={formData.addressType === "Work"}
                    className="form-input"
                    id="work"
                    type="radio"
                    onChange={handleInputChange}
                  />
                  <span className="text-black">Work</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="form-row">
                <button onClick={handleSave} className="btn fw-bold primary">
                  Save
                </button>
                <button
                  onClick={() => setIsvisible(false)}
                  className="btn fw-bold cancle"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <ul className="address-list">
            {savedAddresses?.map((data, index) => (
              <li key={index} className="saved-address-list">
                <div className="type-and-delete mb-2">
                  <span className="address-type">
                    {data ? data.addressType : "Home"}
                  </span>
                  {hoveredIndex !== index ? (
                    <i
                      onMouseOver={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="fa-solid fa-ellipsis-vertical"
                    ></i>
                  ) : (
                    <div
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="edit-delete-btns"
                    >
                      <div>
                        <button
                          onClick={() => {
                            setFormData({
                              name: data.name || "",
                              mobile: data.mobile || "",
                              pincode: data.pincode || "",
                              locality: data.locality || "",
                              address: data.address || "",
                              city: data.city || "",
                              state: data.state || "",
                              landmark: data.landmark || "",
                              alternatePhone: data.alternatePhone || "",
                              addressType: data.addressType || "",
                              _id: data._id, // keep the id for editing
                            }); // populate form with selected address
                            setIsvisible(true);
                          }}
                          className="hover-btns"
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="hover-btns"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-2 d-flex gap-4 fw-bold">
                  <span> {data.name} </span> <span> {data.mobile} </span>
                </div>

                <p> {data.address} </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
