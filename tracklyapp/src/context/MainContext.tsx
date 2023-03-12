import {update, ref} from 'firebase/database';
import {realtimeDatabase} from '../firebase';
import React, {useState, Dispatch, ReactNode} from 'react';
import {useContext, createContext, SetStateAction} from 'react';

type MainContextValues = {
  setSharePosition: Dispatch<SetStateAction<boolean>>;
  setUserPosition: Dispatch<SetStateAction<Coordinates>>;
  updatePosition: (userId: string, location: Coordinates) => void;
};

const MainContext = createContext({} as MainContextValues);

export const MainProvider = ({children}: {children: ReactNode}) => {
  const [sharePosition, setSharePosition] = useState<boolean>(false);
  const [userPosition, setUserPosition] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  console.log(sharePosition);
  const updatePosition = (userId: string, location: Coordinates) => {
    // console.log(location)
    // update(ref(realtimeDatabase, 'drivers/' + userId), {location});
  };

  return (
    <MainContext.Provider
      value={{updatePosition, setUserPosition, setSharePosition}}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
