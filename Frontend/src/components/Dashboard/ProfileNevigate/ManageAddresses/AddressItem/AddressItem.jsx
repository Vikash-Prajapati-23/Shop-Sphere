import { useState } from "react";

export const AddressItem = ({
  data,
  index,
  setFormData,
  setIsVisible,
  handleDelete,
  isCheckout,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <li key={index} className="saved-address-list">
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
    </li>
  );
};
