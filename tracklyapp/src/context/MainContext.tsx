import React, {useState, Dispatch, ReactNode} from 'react';
import {useContext, createContext, SetStateAction} from 'react';

type MainContextValues = {
  userPosition: Coordinates;
  setUserPosition: Dispatch<SetStateAction<Coordinates | any>>;
};

const MainContext = createContext<MainContextValues>({} as MainContextValues);

export const MainProvider = ({children}: {children: ReactNode}) => {
  const [userPosition, setUserPosition] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });

  return (
    <MainContext.Provider value={{userPosition, setUserPosition}}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
