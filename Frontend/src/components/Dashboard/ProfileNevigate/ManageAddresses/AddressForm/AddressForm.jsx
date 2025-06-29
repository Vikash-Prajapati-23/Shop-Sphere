import "./AddressForm.css";

export const AddressForm = ({
  formData,
  handleInputChange,
  handleSave,
  setIsVisible,
  isSaving,
}) => {
  return (
    <form className="add-address">
      <p className="fw-semibold mb-4 text-size-b">ADD A NEW ADDRESS</p>
      <form className="form-area">
        {/* Row 1 */}
        <div className="form-row text-size-b">
          <div className="form-group">
            <label className="label-text text-size-b" htmlFor="name">
              Name
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
          <div className="form-group">
            <label className="label-text text-size-b" htmlFor="mobile">
              Mobile
            </label>
            <input
              required
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text text-size-b">Pincode</label>
            <input
              required
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
          <div className="form-group">
            <label className="label-text text-size-b">Locality</label>
            <input
              required
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-row ">
          <div className="form-group full-width">
            <label className="label-text text-size-b">Address</label>
            <textarea
              required
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={2}
              className="form-input-address text-size-s"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text text-size-b">City</label>
            <input
              required
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
          <div className="form-group">
            <label className="label-text text-size-b">State</label>
            <input
              required
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text text-size-b">Landmark</label>
            <input
              required
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
          <div className="form-group">
            <label className="label-text text-size-b">Alternate Phone</label>
            <input
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleInputChange}
              className="form-input text-size-s"
            />
          </div>
        </div>

        {/* Address Type */}
        <span className="mt-2 ms-3 address-type-size text-size-b">
          Address Type
        </span>
        <div className="d-flex gap-5 mb-3 ms-3">
          <div className="d-flex gap-3 text-size-b">
            <input
              type="radio"
              name="addressType"
              value="Home"
              checked={formData.addressType === "Home"}
              onChange={handleInputChange}
            />
            <span>Home</span>
          </div>
          <div className="d-flex gap-3 text-size-b">
            <input
              type="radio"
              name="addressType"
              value="Work"
              checked={formData.addressType === "Work"}
              onChange={handleInputChange}
            />
            <span>Work</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-row">
          <button
            onClick={handleSave}
            className="btn fw-bold primary text-size-b"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="btn fw-bold cancle text-size-b"
          >
            Cancel
          </button>
        </div>
      </form>
    </form>
  );
};
