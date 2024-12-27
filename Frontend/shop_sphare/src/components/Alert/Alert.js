import React, {useContext} from "react";
import "./Style/Alert.css";
import { alertContext, themeContext } from "../../App";

const Alert = () => {

  const {alert} = useContext(alertContext)
  const toggleMode = useContext(themeContext);

  return (
    <>
      <div >
      {alert && (
        <div
          // style={{boxShadow: toggleMode.mode === true ? " 0 4px 8px rgba(0, 0, 0, 0.2)" : " 0 4px 8px rgba(251, 249, 249, 0.2)"}}
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
