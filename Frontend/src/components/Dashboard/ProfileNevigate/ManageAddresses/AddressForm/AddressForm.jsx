export const AddressForm = ({
  formData,
  handleInputChange,
  handleSave,
  setIsVisible,
  isSaving,
}) => {
  return (
    <div className="add-address">
      <p className="fw-semibold mb-4">ADD A NEW ADDRESS</p>
      <form className="form-area">
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text" htmlFor="name">Name</label>
            <input required name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="label-text" htmlFor="mobile">Mobile</label>
            <input required name="mobile" value={formData.mobile} onChange={handleInputChange} className="form-input" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text">Pincode</label>
            <input required name="pincode" value={formData.pincode} onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="label-text">Locality</label>
            <input required name="locality" value={formData.locality} onChange={handleInputChange} className="form-input" />
          </div>
        </div>

        {/* Address */}
        <div className="form-row address-row">
          <div className="form-group full-width">
            <label className="label-text">Address</label>
            <textarea required name="address" value={formData.address} onChange={handleInputChange} className="form-input-address" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text">City</label>
            <input required name="city" value={formData.city} onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="label-text">State</label>
            <input required name="state" value={formData.state} onChange={handleInputChange} className="form-input" />
          </div>
        </div>

        {/* Row 4 */}
        <div className="form-row">
          <div className="form-group">
            <label className="label-text">Landmark</label>
            <input required name="landmark" value={formData.landmark} onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-group">
            <label className="label-text">Alternate Phone</label>
            <input name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} className="form-input" />
          </div>
        </div>

        {/* Address Type */}
        <span className="mt-2 ms-3 address-type-size">Address Type</span>
        <div className="d-flex gap-5 mb-3 ms-3">
          <div className="d-flex gap-3">
            <input type="radio" name="addressType" value="Home" checked={formData.addressType === "Home"} onChange={handleInputChange} />
            <span>Home</span>
          </div>
          <div className="d-flex gap-3">
            <input type="radio" name="addressType" value="Work" checked={formData.addressType === "Work"} onChange={handleInputChange} />
            <span>Work</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-row">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSave(e);
            }}
            className="btn fw-bold primary"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setIsVisible(false)} className="btn fw-bold cancle">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
