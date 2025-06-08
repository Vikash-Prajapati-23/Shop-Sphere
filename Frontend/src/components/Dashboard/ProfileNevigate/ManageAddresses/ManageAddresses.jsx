import { useState } from "react";
import toast from "react-hot-toast";
import "./ManageAddress.css";

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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsvisible(true);
    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/address", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(
        error,
        "Something went wrong while updating the address. Please try again leter."
      );
    } finally {
      setIsSaving(false);
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
            <span>&#10133;</span> ADD A NEW ADDRESS
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
      </div>
    </div>
  );
};
