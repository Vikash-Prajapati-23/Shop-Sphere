const CartAddressBlock = ({
  isLoggedIn,
  selectedAddress,
  allAddresses,
  setSelectedAddress,
}) => {
  return (
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
        {isLoggedIn && allAddresses.length > 0 && (
          <select
            className="form-select mt-2"
            value={selectedAddress?._id || ""}
            onChange={(e) => {
              const addr = allAddresses.find((a) => a._id === e.target.value);
              if (addr) setSelectedAddress(addr);
            }}
          >
            {allAddresses.map((addr) => (
              <option key={addr._id} value={addr._id}>
                {addr.name}, {addr.addressType}, {addr.pincode}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default CartAddressBlock;
