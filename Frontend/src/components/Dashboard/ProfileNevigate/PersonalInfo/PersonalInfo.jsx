import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export const PersonalInfo = ({ handleInputChange, formData, setFormData }) => {
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            gender: data.user.gender || "",
            email: data.user.email || "",
            contact: data.user.contact || "",
          });
        }
      } catch (err) {
        toast.error("Something went wrong on profile info.jsx!");
      }
    };
    fetchProfile();
  }, [setFormData]);

  const handleSave = async (field) => {
    setIsSaving(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
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

  return (
    <section className={`profile-personal-secs $}`}>
      <form className="profile-details">
        <div className="name-section mb-lg-5 mb-md-3 form-part">
          <span className="sections fw-semibold profile-text-size-b">Personal Information</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditName((prev) => !prev);
            }}
            className="btns fw-semibold profile-text-size-s"
          >
            {!isEditName ? "Edit" : "Cancel"}
          </button>

          <div className="form-gap mb-4">
            <input
              className=" mb-md-4 me-2 input-field profile-text-size-s"
              placeholder="First Name"
              disabled={!isEditName}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              className="input-field me-4 profile-text-size-s"
              disabled={!isEditName}
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {isEditName ? (
              <button
                className="save-btn save-btn-1 profile-text-size-s"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave("name");
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <span
                    className="spinner-border spinner-border-sm profile-text-size-s"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Save"
                )}
              </button>
            ) : null}
          </div>

          <span className="fw-semibold profile-text-size-b">Your Gender</span>
          <div className="gender-section mb-lg-5 mb-4 d-flex mt-2 profile-text-size-s">
            <div className="me-3">
              <input
                id="genderMale"
                disabled={!isEditName}
                className="radio"
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              <label htmlFor="genderMale" className="ms-2">
                Male
              </label>
            </div>

            <div className="me-3">
              <input
                id="genderFemale"
                disabled={!isEditName}
                className="radio"
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              <label htmlFor="genderFemale" className="ms-2">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="email-section mb-lg-5 mb-4 form-part">
          <span className="sections fw-semibold profile-text-size-b">Your Email</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditEmail((prev) => !prev);
            }}
            className="btns fw-semibold profile-text-size-s"
          >
            {!isEditEmail ? "Edit" : "Cancle"}
          </button>

          <div className="form-gap">
            <input
              placeholder="example@gmail.com"
              disabled={!isEditEmail}
              className="input-field me-4 profile-text-size-s"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {isEditEmail ? (
              <button
                className="save-btn profile-text-size-s"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave("email");
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <span
                    className="spinner-border spinner-border-sm profile-text-size-s"
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
          <span className="sections fw-semibold profile-text-size-b">Contact number</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditContact((prev) => !prev);
            }}
            className="btns fw-semibold profile-text-size-s"
          >
            {!isEditContact ? "Edit" : "Cancel"}
          </button>

          <div className="form-gap">
            <input
              placeholder="+91 1234567890"
              disabled={!isEditContact}
              className="input-field me-4 profile-text-size-s"
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            {isEditContact ? (
              <button
                className="save-btn profile-text-size-s"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave(e);
                }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <span
                    className="spinner-border spinner-border-sm profile-text-size-s"
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
