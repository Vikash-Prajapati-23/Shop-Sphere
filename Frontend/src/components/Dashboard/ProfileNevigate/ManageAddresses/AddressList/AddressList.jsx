import { AddressItem } from "../AddressItem/AddressItem";

export const AddressList = ({
  savedAddresses,
  setFormData,
  isVisible,
  setIsVisible,
  handleDelete,
}) => {
  return (
    <ul className="address-list mb-md-0 mb-b">
      {savedAddresses.map((data, index) => (
        <AddressItem
          key={index}
          data={data}
          index={index}
          setFormData={setFormData}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
