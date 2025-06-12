import { useState } from "react";
import { useFormData } from "../../../context/formDataContext";
import Button from "../../Button/Button";
import { AddressItem } from "../../Dashboard/ProfileNevigate/ManageAddresses/AddressItem/AddressItem";
import CartAddressBlock from "../CartAddressBlock/CartAddressBlock";
import { AddAddressButton } from "../../Dashboard/ProfileNevigate/ManageAddresses/AddAddressButton/AddAddressButton";
import { AddressForm } from "../../Dashboard/ProfileNevigate/ManageAddresses/AddressForm/AddressForm";

const CartSection = ({
  displayCart,
  selectedAddress,
  allAddresses,
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
    formData,
    setFormData,
    isVisible,
    setIsVisible,
    handleInputChange,
    handleSave,
    isSaving,
  } = useFormData();
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);

  return (
    <section className="section-part my-4">
      {!isPlaceOrder ? (
        <div>
          <CartAddressBlock
            selectedAddress={selectedAddress}
            allAddresses={allAddresses}
            setSelectedAddress={setSelectedAddress}
            isLoggedIn={isLoggedIn}
          />
          {console.log({ allAddresses })}

          <ul className="ul-cart-list pt-2">
            {displayCart.map((product) => (
              <li
                style={{ backgroundColor: "white" }}
                className="cart-list m-0 p-4"
                key={product._id || product.id}
              >
                <div className=" justify-content-between align-items-center">
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
                      Delivery by sunday, June 17 | Deliver cost
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
                            className=" fw-bold quantity-btns"
                            btnName={"-"}
                          />
                          {console.log(
                            "Qty:",
                            product.quantity,
                            typeof product.quantity
                          )}
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
                      <div className="ms-5"></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total d-flex justify-content-end">
            {/* If the user is not logged in then clicking the button should redirect him to login page with a proper message.
            This is to be fixed in future */}
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
            {allAddresses.map((data) => (
              <li key={data._id} className="saved-address-list bg-white py-3  ">
                <div className="select-address-checkout">
                  <input
                    className="text-primary mt-2 radio-checkout"
                    type="radio"
                  />
                  <div className="user-detail-checkout">
                    <div className="mb-1 d-flex gap-4">
                      <span>{data.name}</span>
                      <span>{data.addressType}</span>
                      <span>{data.mobile}</span>
                    </div>
                    <p>{data.address}</p>
                  </div>
                  <Button
                    className={"text-primary edit-btn"}
                    onClick={() => {
                      setFormData({ ...data });
                      setIsVisible(true);
                    }}
                    btnName={"Edit"}
                  />
                </div>
                <Button className={"deliver-btn"} btnName={"Deliver Here"} />
              </li>
            ))}
            {!isVisible ? (
              <AddAddressButton setIsVisible={setIsVisible} />
            ) : (
              <AddressForm
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
                setIsVisible={setIsVisible}
                isSaving={isSaving}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSection;
