import React, { useState } from "react";
import "./Style/Alert.css";
import Button from "../Button/Button";

const Alert = (props) => {
  return (
    <>
      <div className="live">
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} m-3 alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.message}</strong>
        </div>
        )}
      </div>
    </>
  );
};

export default Alert;
