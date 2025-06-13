import toast from "react-hot-toast";
import { useState } from "react";

export const PersonalInfo = ({ handleInputChange, formData, setFormData }) => {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Validation helpers
  const validateName = () => {
    if (!formData.firstName || formData.firstName.trim() === "") {
      toast.error("First name cannot be empty.");
      return false;
    }
    if (!formData.lastName || formData.lastName.trim() === "") {
      toast.error("Last name cannot be empty.");
      return false;
    }
    return true;
  };
  const validateEmail = () => {
    if (!formData.email || formData.email.trim() === "") {
      toast.error("Email cannot be empty.");
      return false;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.");
      return false;
    }
    return true;
  };
  const validateContact = () => {
    if (!formData.contact || formData.contact.trim() === "") {
      toast.error("Contact number cannot be empty.");
      return false;
    }
    // Simple phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contact.trim())) {
      toast.error("Contact number must be 10 digits.");
      return false;
    }
    return true;
  };
  
  const handleSave = async (field) => {
  setIsSaving(true);

  let updatedFields = {};

  if (field === "name") {
    if (!validateName()) {
      setIsSaving(false);
      return;
    }
    updatedFields.firstName = formData.firstName;
    updatedFields.lastName = formData.lastName;
    updatedFields.gender = formData.gender;
  }

  if (field === "email") {
    if (!validateEmail()) {
      setIsSaving(false);
      return;
    }
    updatedFields.email = formData.email;
  }

  if (field === "contact") {
    if (!validateContact()) {
      setIsSaving(false);
      return;
    }
    updatedFields.contact = formData.contact;
  }

  try {
    const response = await fetch("http://localhost:3001/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedFields), // Only sending edited fields
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      if (field === "name") setIsEditName(false);
      if (field === "email") setIsEditEmail(false);
      if (field === "contact") setIsEditContact(false);
      setFormData((prev) => ({ ...prev, ...data.data }));
    } else {
      toast.error(data.message || "Something went wrong, please try again.");
    }
  } catch (err) {
    toast.error(err.message || "Failed to update");
  } finally {
    setIsSaving(false);
  }
};


  return (
    <section>
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
              onChange={handleInputChange}
            />
            <input
              className="input-field me-4"
              disabled={!isEditName}
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
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
            {!isEditEmail ? "Edit" : "Cancel"}
          </button>

          <div className="form-gap">
            <input
              placeholder="example@gmail.com"
              disabled={!isEditEmail}
              className="input-field me-4"
              type="email"
              name="email"
              value={formData.email}
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
            {!isEditContact ? "Edit" : "Cancel"}
          </button>

          <div className="form-gap">
            <input
              placeholder="+91 1234567890"
              disabled={!isEditContact}
              className="input-field me-4"
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              maxLength={10}
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
  );
};
