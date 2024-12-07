import React from "react";
import "./Style/Alert.css";

const Alert = ({alert}) => {
  return (
    <>
      <div className="live">
      {alert && (
        <div
          className={`alert alert-${alert.type} m-3 alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alert.message}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        )}
      </div>
    </>
  );
};

export default Alert;
