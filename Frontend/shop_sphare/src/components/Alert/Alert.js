import React, { useState } from "react";
import "./Style/Alert.css";
import Button from "../Button/Button";

const Alert = (props) => {
  //   const [alertMessage, setAlertMessage] = useState(null); // State to store the alert message

  //   const showAlert = () => {
  //     setAlertMessage("Item added to Wishlist!"); // Set alert message
  //     setTimeout(() => setAlertMessage(null), 3000); // Auto-dismiss after 3 seconds
  //   };

  return (
    <>
      <div className="live">
        <div
          className={`alert alert-${props.type} m-3 alert-dismissible fade show`}
          role="alert"
        >
          {props.alertMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
};

export default Alert;
