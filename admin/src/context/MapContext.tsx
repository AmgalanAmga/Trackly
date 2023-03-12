import { database } from "../firebase";
import { useContext, createContext } from "react";
import { onChildChanged } from "firebase/database";
import { ref, DataSnapshot } from "firebase/database";
import { useState, useEffect, ReactNode } from "react";

type MapContextValues = {
  activeDrivers: DataSnapshot[];
};

const MapContext = createContext({} as MapContextValues);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [activeDrivers, setActiveDrivers] = useState<DataSnapshot[]>([]);

  useEffect(() => {
    const drivers = ref(database, "driversPosition/");
    onChildChanged(drivers, (snapShot) => {
      const driver = snapShot.val();
      setActiveDrivers((pre: DataSnapshot[]) => {
        return [...pre, driver];
      });
    });
  }, []);

  return (
    <MapContext.Provider value={{ activeDrivers }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
