export const AddAddressButton = ({ setIsVisible }) => (
  <button
    onClick={() => setIsVisible(true)}
    className="add-address-btn fw-semibold"
  >
    <span className="me-4">&#10133;</span> ADD A NEW ADDRESS
  </button>
);
