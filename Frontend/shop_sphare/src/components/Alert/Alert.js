import React from "react";
import "./Style/Alert.css";

const Alert = ({alert}) => {
  return (
    <>
      <div className=" ">
      {alert && (
        <div
          className={`alert alert-overlay alert-${alert.type} modal-alert`}
        >
          <strong className="alert-msg text-center">{alert.message}</strong>
        </div>
        )}
      </div>
    </>
  );
};

export default Alert;
