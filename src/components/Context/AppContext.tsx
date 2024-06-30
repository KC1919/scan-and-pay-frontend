// components/Context/AppContext.js
import React, { ReactElement, createContext, useState } from 'react';


interface AppContextType {
  isSearching: boolean;
  handleSearching: (data: boolean) => void;
}

// Create a Context with a default value
const AppContext = createContext<AppContextType>({
  isSearching: false,
  handleSearching: () => {},
});

// Create a Provider component
const AppContextProvider = ({children}) => {
  const [isSearching, setisSearching] = useState(false);

  const handleSearching = (data: boolean) => {
    setisSearching(data);
  };

  return (
    <AppContext.Provider value={{ isSearching, handleSearching }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
