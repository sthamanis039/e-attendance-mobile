import React, {createContext} from 'react';

const AppContext = createContext();

export function AppContextProvider({children}) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export default AppContext;
