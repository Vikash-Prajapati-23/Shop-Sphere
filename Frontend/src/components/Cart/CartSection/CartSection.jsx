import { useState, useEffect } from "react";
import { useFormData } from "../../../context/formDataContext";
import Button from "../../Button/Button";
import { AddressForm } from "../../Dashboard/ProfileNevigate/ManageAddresses/AddressForm/AddressForm";
import CartAddressBlock from "../CartAddressBlock/CartAddressBlock";
import { AddAddressButton } from "../../Dashboard/ProfileNevigate/ManageAddresses/AddAddressButton/AddAddressButton";

const CartSection = ({
  displayCart,
  selectedAddress,
  setSelectedAddress,
  isLoggedIn,
  handleProductDelete,
  handleProductIncrement,
  handleProductDecrement,
  handleAddToWishList,
  deliveryCost,
  handleCardClick,
}) => {
  const {
    savedAddresses,
    setSavedAddresses,
    formData,
    setFormData,
    isVisible,
    setIsVisible,
    handleInputChange,
    handleSave,
    isSaving,
  } = useFormData();

  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [editAddressById, setEditAddressById] = useState(null);

  const visibleAddress = showAll ? savedAddresses : savedAddresses.slice(0, 3);

  const refreshAddresses = async () => {
    try {
      const res = await fetch("/api/auth/getAddresses", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setSavedAddresses([...data.addresses] || []);
      }
    } catch (err) {
      console.error("Failed to refresh addresses", err);
    }
  };

  const handleSaveAndRefresh = async (e) => {
    await handleSave(e);
    await refreshAddresses();
    setEditAddressById(null);
    setIsVisible(false);
  };

  return (
    <section className="section-part my-4">
      {!isPlaceOrder ? (
        <div>
          <CartAddressBlock
            selectedAddress={selectedAddress}
            allAddresses={savedAddresses}
            setSelectedAddress={setSelectedAddress}
            isLoggedIn={isLoggedIn}
          />

          <ul className="ul-cart-list pt-2">
            {displayCart.map((product) => (
              <li
                style={{ backgroundColor: "white" }}
                className="cart-list m-0 p-4"
                key={product._id || product.id}
              >
                <div className="justify-content-between align-items-center">
                  <div className="product mb-1">
                    <div className="product-details m-0 p-0">
                      <img
                        src={product.image}
                        className="cart-product-img"
                        alt={product.title}
                        onClick={() => handleCardClick(product)}
                      />
                    </div>

                    <div className="product-details-wide">
                      <div>
                        <p className="product-title">
                          {product.title?.slice(0, 51) || "No Title"}...
                        </p>
                        <p className="product-title-rest">
                          {product.title?.slice(51) || ""}
                        </p>
                      </div>

                      <div className="fw-bold mb-2">₹{product.price}</div>
                      <div className="d-flex align-items-center">
                        <p>
                          <span className="fw-bold" style={{ color: "gold" }}>
                            ★{" "}
                          </span>
                          <span className="me-3">{product.rating?.rate}</span>
                        </p>
                        <p className="fw-bold rating-font-size">
                          Reviews {product.rating?.count}
                        </p>
                      </div>
                    </div>

                    <div className="product-details-semiwide">
                      Delivery by Sunday, June 17 | Delivery cost
                      <span className="text-decoration-line-through mx-2">
                        ₹{deliveryCost}
                      </span>
                      <span className="text-success">Free</span>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center">
                      {isLoggedIn && (
                        <>
                          <Button
                            onClick={() => handleProductDecrement(product._id)}
                            disabled={product.quantity <= 1}
                            className="fw-bold quantity-btns"
                            btnName={"-"}
                          />
                          <span className="mx-1 fw-bold product-quantity">
                            {product.quantity}
                          </span>
                          <Button
                            onClick={() => handleProductIncrement(product._id)}
                            className="quantity-btns-inc fw-bold"
                            btnName={"+"}
                          />
                        </>
                      )}
                      <Button
                        className="btn cart-btns fw-bold ms-4"
                        onClick={() => handleAddToWishList(product)}
                        btnName={"MOVE TO WISHLIST"}
                      />
                      <Button
                        onClick={() =>
                          handleProductDelete(product._id || product.id)
                        }
                        className="btn cart-btns fw-bold"
                        btnName={"REMOVE"}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total d-flex justify-content-end">
            <Button
              className="fw-bold place-order-btn"
              onClick={() => setIsPlaceOrder(true)}
              btnName={"PLACE ORDER"}
            />
          </div>
        </div>
      ) : (
        <div className="d-flex">
          <div className="all-addresses-checkout">
            <h4 className="fw-bold bg-primary text-white mb-0 py-2 px-4">
              Choose delivery location
            </h4>

            {visibleAddress.map((data) => (
              <li key={data._id} className="saved-address-list bg-white">
                {editAddressById === data._id && isVisible ? (
                  <AddressForm
                    key={editAddressById}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    handleSave={handleSaveAndRefresh}
                    setIsVisible={() => {
                      setEditAddressById(null);
                      setIsVisible(false);
                    }}
                    isSaving={isSaving}
                  />
                ) : (
                  <div>
                    <div className="select-address-checkout">
                      <input
                        className="text-primary mt-2 radio-checkout"
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress?._id === data._id}
                        onChange={() => setSelectedAddress(data)}
                      />
                      <div className="user-detail-checkout">
                        <div className="mb-1 d-flex gap-3">
                          <span className="text-size-checkout fw-bold">
                            {data.name}
                          </span>
                          <span className="addressType-checkout text-size-checkout">
                            {data.addressType}
                          </span>
                          <span className="text-size-checkout fw-bold">
                            {data.mobile}
                          </span>
                        </div>
                        <p className="text-size-address-checkout">
                          {data.address}
                        </p>
                      </div>
                      <Button
                        className="text-primary edit-btn fw-bold text-size-checkout"
                        onClick={() => {
                          setFormData(data);
                          setEditAddressById(data._id);
                          setIsVisible(true);
                        }}
                        btnName={"EDIT"}
                      />
                    </div>
                    <Button
                      className="deliver-btn mt-2 fw-bold text-size-checkout"
                      btnName={"DELIVER HERE"}
                    />
                  </div>
                )}
              </li>
            ))}

            {savedAddresses.length > 3 && (
              <button
                className="w-100 bg-white text-primary py-2 ps-3 fw-semibold border"
                onClick={() => setShowAll((prev) => !prev)}
              >
                <div className="d-flex align-items-center">
                  <i
                    className={`bi ${
                      showAll ? "bi-chevron-up" : "bi-chevron-down"
                    } me-4 ms-1`}
                  ></i>
                  <p className="pt-2 mb-2">
                    {showAll
                      ? "View less"
                      : `View all ${savedAddresses.length - 3} address`}
                  </p>
                </div>
              </button>
            )}

            <div className="mt-2">
              {!isVisible && !editAddressById && (
                <AddAddressButton
                  setIsVisible={setIsVisible}
                  setFormData={setFormData}
                />
              )}
              {isVisible && !editAddressById && (
                <AddressForm
                  formData={formData}
                  setFormData={setFormData}
                  handleInputChange={handleInputChange}
                  handleSave={handleSaveAndRefresh}
                  setIsVisible={setIsVisible}
                  isSaving={isSaving}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSection;
