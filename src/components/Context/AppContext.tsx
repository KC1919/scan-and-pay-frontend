// components/Context/AppContext.js
import React, { ReactElement, createContext, useState } from 'react';

interface AppContextType {
  isSearching: boolean;
  handleSearching: (data: boolean) => void;
  updateProduct: boolean;
  handleUpdateProduct: (data: boolean) => void;
}

// Create a Context with a default value
const AppContext = createContext<AppContextType>({
  isSearching: false,
  handleSearching: () => {},
  updateProduct: false,
  handleUpdateProduct: () => {},
});

// Create a Provider component
const AppContextProvider = ({ children }) => {
  const [isSearching, setisSearching] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);

  const handleSearching = (data: boolean) => {
    setisSearching(data);
  };

  const handleUpdateProduct = (data: boolean) => {
    setUpdateProduct(data);
  };

  return (
    <AppContext.Provider
      value={{
        isSearching,
        handleSearching,
        updateProduct,
        handleUpdateProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
