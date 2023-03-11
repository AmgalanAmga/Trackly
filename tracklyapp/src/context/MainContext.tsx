import {createContext, useContext, ReactNode} from 'react';

type MainContextValues = {};

const MainContext = createContext<MainContextValues>({} as MainContextValues);

export const MainProvider = ({children}: {children: ReactNode}) => {
  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export const useMainContext = () => useContext(MainContext);
