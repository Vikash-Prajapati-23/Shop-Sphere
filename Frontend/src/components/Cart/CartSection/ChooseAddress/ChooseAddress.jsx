import Button from "../../../Button/Button";
import { AddressForm } from "../../../Dashboard/ProfileNevigate/ManageAddresses/AddressForm/AddressForm";
import { AddAddressButton } from "../../../Dashboard/ProfileNevigate/ManageAddresses/AddAddressButton/AddAddressButton";

const ChooseAddress = ({
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
}) => {
  return (
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
                    <p className="text-size-address-checkout">{data.address}</p>
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
  );
};

export default ChooseAddress;
