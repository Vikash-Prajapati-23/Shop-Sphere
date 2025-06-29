import Button from "../../../Button/Button";
import { AddressForm } from "../../../Dashboard/ProfileNevigate/ManageAddresses/AddressForm/AddressForm";
import { AddAddressButton } from "../../../Dashboard/ProfileNevigate/ManageAddresses/AddAddressButton/AddAddressButton";
import "../CartSection.css";

const ChooseAddress = ({
  name,
  handleSaveAndRefresh,
  handleSave,
  editAddressById,
  setEditAddressById,
  isSaving,
  formData,
  setFormData,
  handleInputChange,
  isVisible,
  setIsVisible,
  selectedAddress,
  setSelectedAddress,
  savedAddresses,
  showAll,
  setShowAll,
  visibleAddress,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
    <div className="">
      <div className="all-addresses-checkout">
        <div className="bg-white mb-3 p-1 ps-md-4 ps-3 py-2 bg-primary box-shadow-heads">
          <div className="d-flex justify-content-between upper-logs">
            <div className="d-flex align-items-center gap-3">
              <div className="all-addresses-checkout-index bg-light text-size-b text-primary">
                {currentIndex}
              </div>
              <div>
                <span className="text-secondary fw-bold text-size-b">LOGIN</span>
                <i className="fa-solid fa-check text-primary ms-2 text-size-b"></i>
              </div>
            </div>
          </div>

          <div className="choose-address-head mt-2 text-size-s">
            <span className="me-2 head-text-size"> {name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()} </span>
            <span> {selectedAddress ? selectedAddress.mobile : ""} </span>
          </div>
        </div>

        <h4 className="fw-bold bg-primary text-white mb-0 py-2 px-4 text-size-b">
          {currentIndex} Choose delivery location
        </h4>

        {visibleAddress.map((data) => (
          <li key={data._id} className="saved-address-list cart-list bg-white">
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
              <div className="cart-list">
                <div className="select-address-checkout text-size-b">
                  <input
                    className="text-primary mt-lg-2 mt-md-1 radio-checkout"
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddress?._id === data._id}
                    onChange={() => setSelectedAddress(data)}
                  />
                  <div className="user-detail-checkout">
                    <div className="mb-1 d-flex gap-md-3 gap-0">
                      <span className="text-size-checkout fw-semibold text-size-s">
                        {data.name}
                      </span>
                      <span className="addressType-checkout text-size-checkout text-size-s">
                        {data.addressType}
                      </span>
                      <span className="text-size-checkout fw-semibold text-size-s">
                        {data.mobile}
                      </span>
                    </div>
                    <p className="text-size-address-checkout text-size-s">{data.address}</p>
                  </div>
                  <Button
                    className="text-primary edit-btn fw-semibold text-size-checkout text-size-s"
                    onClick={() => {
                      setFormData(data);
                      setEditAddressById(data._id);
                      setIsVisible(true);
                    }}
                    btnName={"EDIT"}
                  />
                </div>
                <Button
                  onClick={() => setCurrentIndex(3)}
                  className="deliver-btn mt-2 fw-semibold text-size-checkout text-size-s"
                  btnName={"DELIVER HERE"}
                />
              </div>
            )}
          </li>
        ))}

        {savedAddresses.length > 3 && (
          <button
            className="w-100 bg-white text-primary py-2 ps-3 fw-semibold border box-shadow-heads text-size-b"
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

        {/* Add new address button.! */}
        <div className="mt-2 box-shadow-heads text-size-b">
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

        {/* FURHTER STEPS. */}
        <div className="fw-bold bg-white my-3 p-1 ps-md-4 ps-3 py-3 bg-primary box-shadow-heads">
          <div className="d-flex align-items-center gap-3">
            <div className="all-addresses-checkout-index bg-light text-primary text-size-b">
              {currentIndex + 1}
            </div>
            <div>
              <span className="text-secondary text-size-b">ORDER SUMMARY</span>
            </div>
          </div>
        </div>

        <div className="fw-bold bg-white my-3 p-1 ps-md-4 ps-3 py-3 bg-primary box-shadow-heads">
          <div className="d-flex align-items-center gap-3">
            <div className="all-addresses-checkout-index bg-light text-primary text-size-b">
              {currentIndex + 2}
            </div>
            <div>
              <span className="text-secondary text-size-b">PAYMENT OPTIONS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAddress;
