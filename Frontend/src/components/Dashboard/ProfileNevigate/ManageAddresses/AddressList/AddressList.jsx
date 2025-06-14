import { AddressItem } from "../AddressItem/AddressItem";

export const AddressList = ({
  savedAddresses,
  setFormData,
  isVisible,
  setIsVisible,
  handleDelete,
}) => {
  return (
    <ul className="address-list">
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
      {console.log(savedAddresses, "Hey i am from addresslist.")}
    </ul>
  );
};
