import { useState } from "react";
import { AddressForm } from "../AddressForm/AddressForm";
import { useFormData } from "../../../../../context/formDataContext";

export const AddressItem = ({
  data,
  index,
  formData,
  setFormData,
  isVisible,
  setIsVisible,
  isSaving,
  handleDelete,
  handleInputChange,
  handleSave,
  handleSaveAndRefresh,
  isCheckout,
}) => {
  // const {
  //   formData,
  //   setFormData,
  //   handleSave,
  //   handleDelete,
  //   handleInputChange,
  //   setIsSaving,
  //   isSaving,
  //   isVisible,
  //   setIsVisible,
  //   savedAddresses,
  //   setSavedAddresses,
  // } = useFormData()
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <li key={index} className="saved-address-list">
      {/* {isEdit === null && !isVisible ? (
        <AddressForm
          formData={data}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleSave={handleSaveAndRefresh}
          setIsVisible={() => {
            setIsEdit(null);
            setIsVisible(true);
          }}
          isSaving={isSaving}
        />
      ) : ( */}
        <div>
          <div className="type-and-delete mb-2">
            <span className="address-type">{data?.addressType || "Home"}</span>

            {isCheckout ? null : !isHovered ? (
              <i
                className="fa-solid fa-ellipsis-vertical"
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              ></i>
            ) : (
              <div
                className="edit-delete-btns"
                onMouseLeave={() => setIsHovered(false)}
              >
                <div>
                  <button
                    onClick={() => {
                      setFormData({ ...data });
                      setIsVisible(true);
                      setIsEdit(data._id);
                    }}
                    className="hover-btns"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="hover-btns"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mb-2 d-flex gap-4 fw-bold">
            <span>{data.name}</span>
            <span>{data.mobile}</span>
          </div>
          <p>{data.address}</p>
        </div>
      {/* )} */}
    </li>
  );
};
