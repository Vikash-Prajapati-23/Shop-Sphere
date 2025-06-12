import { AddressItem } from "../AddressItem/AddressItem";

export const AddressList = ({
  savedAddresses,
  setFormData,
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
          setIsVisible={setIsVisible}
          handleDelete={handleDelete}
        />
      ))}
      {console.log(savedAddresses, "Hey i am from addresslist.")}
    </ul>
  );
};
