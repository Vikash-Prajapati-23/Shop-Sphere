import { useContext, createContext, useState } from "react";

const addressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <addressContext.Provider value={{ selectedAddress, setSelectedAddress }}>
      {children}
    </addressContext.Provider>
  );
};

export const useAddress = () => useContext(addressContext);
