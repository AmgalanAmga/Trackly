import { database } from "../firebase";
import { useContext, createContext } from "react";
import { onChildChanged, onChildAdded } from "firebase/database";
import { useState, useEffect, ReactNode } from "react";
import { ref, DataSnapshot } from "firebase/database";

type MapContextValues = {};

const MapContext = createContext({} as MapContextValues);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const drivers = ref(database, "drivers/");
    onChildAdded(drivers, (snapShot) => {
      // console.log(snapShot.val());
    });
  }, []);
  return <MapContext.Provider value={{}}>{children}</MapContext.Provider>;
};

export const useMapContext = () => useContext(MapContext);
