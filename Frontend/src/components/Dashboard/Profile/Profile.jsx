import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PersonalInfo } from "../ProfileNevigate/PersonalInfo/PersonalInfo";
import { ManageAddresses } from "../ProfileNevigate/ManageAddresses/ManageAddresses";
import { api } from "../../../utils/api";
// import MyOrders from "../ProfileNevigate/MyOrders/MyOrders";

const Profile = ({ name, isLoggedIn, setIsLoggedIn }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contact: "",
  });

  const handleProfileLogout = async () => {
    try {
      const res = await fetch(api("/api/auth/logout"), {
        method: "GET",
        credentials: "include", // sends cookie!
      });
      if (res.ok) {
        setIsLoggedIn(false); // update local state
        navigate("/LoginSignup");
        toast.success("Logged out successfully!");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred");
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
            <p className="name-text">{name ? name : formData.firstName}</p>{" "}
          </div>
        </div>

        <div className="side-profile">
          <Link className="text-decoration-none" to={"/MyOrders"}>
            <div className="d-flex gap-3 side-profile-secs">
              <i className="fas fa-box mt-1 text-primary"></i>
              <div className="d-flex justif-content-between gap-5">
                <h5>My orders</h5>
                <i className="bi bi-chevron-double-right text-dark"></i>
              </div>
            </div>
          </Link>

          <div className="side-profile-secs">
            <div className="d-flex">
              <i className="fas fa-user-circle me-3 mt-1 text-primary"></i>
              <h5 className="">Account settings</h5>
            </div>
            <ul className="mb-0">
              <li
                onClick={() => {
                  if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
                }}
                className={`lists ${currentIndex === 1 ? "disabled" : ""}`}
              >
                Personal information
              </li>
              <li
                onClick={() => {
                  if (currentIndex === 1) setCurrentIndex(currentIndex + 1);
                }}
                className={`lists ${currentIndex === 2 ? "disabled" : ""}`}
              >
                Manage addresses
              </li>
            </ul>
          </div>

          <div className=" side-profile-secs">
            <div className="d-flex">
              <i className="fas fa-wallet me-3 mt-1 text-primary"></i>
              <h5 className="">Payments</h5>
            </div>

            <ul className="mb-0">
              <li className="lists">Gift Cards</li>
              <li className="lists">Saved UPI</li>
              <li className="lists">Saved Cards</li>
            </ul>
          </div>

          <div className="d-flex side-profile-secs cursor text-primary">
            <i className="ri-logout-circle-r-line user-icon me-2 mt-1"></i>
            <h5 onClick={handleProfileLogout} className="">
              Log Out
            </h5>
          </div>
        </div>
      </aside>

      {currentIndex === 1 && (
        <PersonalInfo
          handleInputChange={handleInputChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentIndex === 2 && (
        <ManageAddresses handleInputChange={handleInputChange} />
      )}
      {/* {currentIndex === 3 && (
        <MyOrders />
      )} */}
    </div>
  );
};

export default Profile;
