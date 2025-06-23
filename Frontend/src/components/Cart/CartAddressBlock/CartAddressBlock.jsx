import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";

const CartAddressBlock = ({
  isLoggedIn,
  selectedAddress,
  savedAddresses,
  setSelectedAddress,
}) => {
  const nevigate = useNavigate();

  return (
    <>
      {selectedAddress ? (
        <div className="d-flex justify-content-between p-3 m-0 cart-head">
          <div>
            <span className="user-address-bold">Deliver to:</span>
            <span className="mx-1 fw-bold user-address-bold">
              {selectedAddress?.name || "User Name"}
            </span>
            {","}
            <span className="fw-bold user-address-bold">
              {selectedAddress?.pincode || "Pincode"}
            </span>
            {","}
            <span className="mx-1 user-address-bold address-type">
              {selectedAddress?.addressType || "Home"}
            </span>
            <div className="user-address-change">
              {selectedAddress?.address || "User Address"}
            </div>
          </div>
          <div className="d-flex align-items-center ">
            {/* <Button className="change-btn" btnName={"Change"} /> */}
            {/* Address picker dropdown */}
            {!isLoggedIn && savedAddresses.length > 0 && (
              <select
                className="form-select mt-2"
                value={selectedAddress?._id || ""}
                onChange={(e) => {
                  const addr = savedAddresses.find(
                    (a) => a._id === e.target.value
                  );
                  if (addr) setSelectedAddress(addr);
                }}
              >
                {savedAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.name}, {addr.addressType}, {addr.pincode}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between p-3 cart-head mt-1 ">
          <p>
            Please add an address first so that we can deliver your product to
            you.
          </p>
          <Button
            btnName={"Add delivery details"}
            onClick={() =>
              nevigate("/Profile", { state: { section: "manageAddresses" } })
            }
            className={
              "text-primary py-2 px-4 border fw-bold text-size-checkout"
            }
          />
        </div>
      )}
    </>
  );
};

export default CartAddressBlock;
