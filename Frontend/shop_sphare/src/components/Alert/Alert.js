import React, {useContext} from "react";
import "./Style/Alert.css";
import { alertContext } from "../../App";

const Alert = () => {

  const {alert} = useContext(alertContext)

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
