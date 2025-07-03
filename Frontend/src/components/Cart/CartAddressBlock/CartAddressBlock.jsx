import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import toast from "react-hot-toast";
import "./CartAddressBlock.css";
import { useFormData } from "../../../context/formDataContext";

const CartAddressBlock = ({
  isLoggedIn,
}) => {
  const nevigate = useNavigate();
    const {
      savedAddresses,
      selectedAddress,
      setSelectedAddress,
    } = useFormData();

  const handleNevigateLogin = () => {
    if (!isLoggedIn) {
      nevigate("/LoginSignup");
      toast("Please login first to add addresses.!");
    } else {
      nevigate("/Profile", { state: { section: "manageAddresses" } });
    }
  };

  return (
    <div className="address-block">
      {isLoggedIn && selectedAddress ? (
        <div className="d-flex justify-content-between p-3 m-0 cart-head">
          <div>
            <span className="user-address-bold text-sizes">Deliver to:</span>
            <span className="mx-1 fw-bold user-address-bold text-sizes">
              {selectedAddress?.name || "User Name"}
            </span>
            {","}
            <span className="fw-bold user-address-bold text-sizes">
              {selectedAddress?.pincode || "Pincode"}
            </span>
            {","}
            <span className="mx-1 user-address-bold address-type text-sizes">
              {selectedAddress?.addressType || "Home"}
            </span>
            <div className="user-address-change text-sizes">
              {selectedAddress?.address || "User Address text-sizes"}
            </div>
          </div>
          <div className="d-flex align-items-center ">
            {!isLoggedIn && savedAddresses.length > 0 && (
              <select
                className="form-select mt-2 text-sizes"
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
        <div className="p-3 cart-head mt-1 text-sizes">
          <p>
            Please add an address first so that we can deliver your product to
            you.
          </p>
          <Button
            btnName={"Add delivery details"}
            onClick={handleNevigateLogin}
            className={
              "text-primary py-2 px-4 border fw-bold text-size-checkout text-sizes"
            }
          />
        </div>
      )}
    </div>
  );
};

export default CartAddressBlock;
