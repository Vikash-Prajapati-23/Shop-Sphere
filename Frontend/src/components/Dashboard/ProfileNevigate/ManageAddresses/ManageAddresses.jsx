import { useState } from "react";
import "./ManageAddress.css";

export const ManageAddresses = () => {
  const [isVisible, setIsvisible] = useState(false);

  return (
    <div className="address-area">
      <h4 className="mb-4">Manage Addresses</h4>

      <div className=""  >
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
                  <label className="label-text"  htmlFor="name">Name</label>
                  <input className="form-input" id="name" type="text" />
                </div>
                <div className="form-group">
                  <label className="label-text"  htmlFor="mobile">Mobile</label>
                  <input className="form-input" id="mobile" type="text" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text"  htmlFor="pincode">Pincode</label>
                  <input className="form-input" id="pincode" type="text" />
                </div>
                <div className="form-group">
                  <label className="label-text"  htmlFor="locality">Locality</label>
                  <input className="form-input" id="locality" type="text" />
                </div>
              </div>

              {/* Address (wider field) */}
              <div className="form-row address-row">
                <div className="form-group full-width">
                  <label className="label-text"  htmlFor="address ">Address</label>
                  <textarea
                    className="form-input-address"
                    id="address"
                    type="text"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text"  htmlFor="city">City</label>
                  <input className="form-input" id="city" type="text" />
                </div>
                <div className="form-group">
                  <label className="label-text"  htmlFor="state">State</label>
                  <input className="form-input" id="state" type="text" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="form-row">
                <div className="form-group">
                  <label className="label-text"  htmlFor="landmark">Landmark</label>
                  <input className="form-input" id="landmark" type="text" />
                </div>
                <div className="form-group">
                  <label className="label-text"  htmlFor="alternate">Alternate Phone</label>
                  <input className="form-input" id="alternate" type="text" />
                </div>
              </div>

              {/* Buttons */}
              <div className="form-row">
                <button className="btn primary">Save</button>
                <button
                  onClick={() => setIsvisible(false)}
                  className="btn cancle"
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
