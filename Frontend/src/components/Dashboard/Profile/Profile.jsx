import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Profile.css";
import { PersonalInfo } from "../ProfileNevigate/PersonalInfo/PersonalInfo";
import { ManageAddresses } from "../ProfileNevigate/ManageAddresses/ManageAddresses";

const Profile = ({ name, handleUserLogout }) => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(
    location.state?.section === "manageAddresses" ? 2 : 1
  );
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contact: "",
  });

  const handleProfileLogout = async () => {
    handleUserLogout();
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
      <aside className={`aside-user ${isOpen ? "open" : ""}`}>
        <div className="user mb-md-3 mb-2">
          <div>
            <img
              className="img-user"
              src="/images/User-Profile-PNG-Image.png"
              alt="User"
            />
          </div>
          <div className="user-name">
            <p className="hello aside-text-size-s">Hello,</p>
            <p className="name-text aside-text-size-b">
              {name
                ? name.slice(0, 1).toUpperCase() + name.slice(1)
                : formData.firstName}
            </p>
          </div>
          <button
            className="side-nav-close-icon"
            onClick={() => setIsOpen(false)}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="side-profile">
          <Link className="text-decoration-none" to={"/MyOrders"}>
            <div className="d-flex side-profile-secs">
              <i className="fas fa-box mt-1 me-lg-3 me-2 text-primary aside-text-size-s"></i>
              <div className="d-flex">
                <h5 className="aside-heads aside-text-size-b me-lg-5 me-md-4">
                  My orders
                </h5>
                <i className="bi bi-chevron-right text-dark aside-text-size-s"></i>
              </div>
            </div>
          </Link>

          <div className="side-profile-secs">
            <div className="d-flex">
              <i className="fas fa-user-circle me-lg-3 me-2 mt-1 text-primary aside-text-size-s"></i>
              <h5 className="aside-heads aside-text-size-b">
                Account settings
              </h5>
            </div>
            <ul className="mb-0 ps-4 aside-ul-padding aside-text-size-s">
              <li
                onClick={() => {
                  if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
                  setIsOpen(false);
                }}
                className={`lists ${currentIndex === 1 ? "disabled" : ""}`}
              >
                Personal information
              </li>
              <li
                onClick={() => {
                  if (currentIndex === 1) setCurrentIndex(currentIndex + 1);
                  setIsOpen(false);
                }}
                className={`lists ${currentIndex === 2 ? "disabled" : ""}`}
              >
                Manage addresses
              </li>
            </ul>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i className="fas fa-wallet me-lg-3 me-2 mt-1 text-primary aside-text-size-s"></i>
              <h5 className="aside-heads aside-text-size-b">Payments</h5>
            </div>

            <ul
              onClick={() => setIsOpen(false)}
              className="mb-0 ps-4 aside-ul-padding aside-text-size-s"
            >
              <li className="lists">Gift Cards</li>
              <li className="lists">Saved UPI</li>
              <li className="lists">Saved Cards</li>
            </ul>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i className="fa-solid fa-address-book me-lg-3 me-2 mt-1 text-primary aside-text-size-s"></i>
              <h5 className="aside-heads aside-text-size-b">Contact</h5>
            </div>

            <ul
              onClick={() => setIsOpen(false)}
              className="mb-0 ps-4 aside-ul-padding aside-text-size-s"
            >
              <li className="lists">
                <Link to={"/AboutUs"} className=" profile-links">
                  About Us
                </Link>
              </li>
              <li className="lists">
                <Link to={"/ContactUs"} className="lists profile-links">
                  Contact Us
                </Link>
              </li>
              <li className="lists">
                <Link to={"/TermsOfUse"} className="lists profile-links">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-start side-profile-secs cursor text-primary">
            <i className="ri-logout-circle-r-line user-icon me-lg-3 me-2 aside-text-size-s"></i>
            <h5
              onClick={handleProfileLogout}
              className="aside-heads aside-text-size-b"
            >
              Log Out
            </h5>
          </div>
        </div>
      </aside>
      <button onClick={() => setIsOpen(true)} className="side-nav-icon">
        <i class="fa-solid fa-bars"></i>
      </button>

      {currentIndex === 1 && (
        <PersonalInfo
          isOpen={isOpen}
          handleInputChange={handleInputChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentIndex === 2 && (
        <ManageAddresses
          isOpen={isOpen}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Profile;
