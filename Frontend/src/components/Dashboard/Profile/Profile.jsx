import { useState } from "react";
import "./Profile.css";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contact: "",
  });

  const handleSave = async (field) => {
    setIsSaving(true);

    // Logic for saving the data separately on clicking save button.
    let payload = {};
    if (field === "name") {
      payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
    } else if (field === "gender") {
      payload = { gender: formData.gender };
    } else if (field === "email") {
      payload = { email: formData.email };
    } else {
      payload = { contact: formData.contact };
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      // console.log(response);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        if (field === "name") setIsEditName(false);
        if (field === "email") setIsEditEmail(false);
        if (field === "contact") setIsEditContact(false);
      } else {
        toast.error(data.message || "Something went wrong, please try again.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update");
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
    <div className="Profile">
      <aside>
        <div className="user mb-3">
          <div>
            <img
              className="img-user"
              src="/images/User-Profile-PNG-Image.png"
              alt="User"
            />
          </div>
          <div className="user-name">
            <p className="hello">Hello,</p>
            <p className="name-text">
              {" "}
              {formData.firstName} {formData.lastName}{" "}
            </p>
          </div>
        </div>

        <div className="side-profile">
          <div className="d-flex gap-3 side-profile-secs">
            <i className="fas fa-box mt-1"></i>
            <h5>My orders</h5>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i className="fas fa-user-circle me-3 mt-1"></i>
              <h5 className="">Account settings</h5>
            </div>
            <ul className="mb-0">
              <li className="lists">Personal information</li>
              <li className="lists">Manage addresses</li>
            </ul>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i className="fas fa-wallet me-3 mt-1"></i>
              <h5 className="">Payments</h5>
            </div>

            <ul className="mb-0">
              <li className="lists">Gift Cards</li>
              <li className="lists">Saved UPI</li>
              <li className="lists">Saved Cards</li>
            </ul>
          </div>

          <div className="d-flex side-profile-secs cursor">
            <i className="ri-logout-circle-r-line user-icon me-2 mt-1"></i>
            <h5 className="">Log Out</h5>
          </div>
        </div>
      </aside>

      <section>
        <Toaster />
        <form className="profile-details">
          <div className="name-section mb-5 form-part">
            <span className="sections fw-semibold">Personal Information</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditName((prev) => !prev);
              }}
              className="btns fw-semibold"
            >
              {!isEditName ? "Edit" : "Cancel"}
            </button>

            <div className="form-gap mb-4">
              <input
                className="me-4 input-field"
                placeholder="First Name"
                disabled={!isEditName}
                type="text"
                name="firstName"
                value={formData.firstName}
                required
                onChange={handleInputChange}
              />
              <input
                className="input-field me-4"
                disabled={!isEditName}
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                required
                onChange={handleInputChange}
              />
              {isEditName ? (
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSave("name");
                  }}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Save"
                  )}
                </button>
              ) : null}
            </div>

            <span className="fw-semibold">Your Gender</span>
            <div className="gender-section d-flex mt-2">
              <div className="me-3">
                <label htmlFor="Male"></label>
                <input
                  disabled={!isEditName}
                  className="radio"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  required
                  onChange={handleInputChange}
                />
                <span className="ms-2">Male</span>
              </div>

              <div className="me-3">
                <label htmlFor="Female"></label>
                <input
                  disabled={!isEditName}
                  className="radio"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  required
                  onChange={handleInputChange}
                />
                <span className="ms-2">Female</span>
              </div>
            </div>
          </div>

          <div className="email-section mb-5 form-part">
            <span className="sections fw-semibold">Your Email</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditEmail((prev) => !prev);
              }}
              className="btns fw-semibold"
            >
              {!isEditEmail ? "Edit" : "Cancle"}
            </button>

            <div className="form-gap">
              <input
                placeholder="example@gmail.com"
                disabled={!isEditEmail}
                className="input-field me-4"
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleInputChange}
              />
              {isEditEmail ? (
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSave("email");
                  }}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Save"
                  )}
                </button>
              ) : null}
            </div>
          </div>

          <div className="contact-section form-part">
            <span className="sections fw-semibold">Contact number</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditContact((prev) => !prev);
              }}
              className="btns fw-semibold"
            >
              {!isEditContact ? "Edit" : "Cancle"}
            </button>

            <div className="form-gap">
              <input
                placeholder="+91 1234567890"
                disabled={!isEditContact}
                className="input-field me-4"
                type="number"
                name="contact"
                value={formData.contact}
                required
                onChange={handleInputChange}
              />
              {isEditContact ? (
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSave("contact");
                  }}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Save"
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
