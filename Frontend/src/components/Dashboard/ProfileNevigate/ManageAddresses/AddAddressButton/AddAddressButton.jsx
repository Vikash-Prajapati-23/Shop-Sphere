import "../../../../Cart/CartSection/CartSection.css"

export const AddAddressButton = ({ setIsVisible }) => (
  <button
    onClick={() => setIsVisible(true)}
    className="add-address-btn fw-semibold d-flex align-items-center"
  >
    <span className="me-md-3 me-2 address-button-size">&#10133;</span>{" "}
    <span className="address-button-size"> ADD A NEW ADDRESS</span>
  </button>
);
