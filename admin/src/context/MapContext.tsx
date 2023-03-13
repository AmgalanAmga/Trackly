import { database } from "../firebase";
import { useContext, createContext, Dispatch, SetStateAction } from "react";
import { onChildAdded, onChildChanged } from "firebase/database";
import { ref, DataSnapshot } from "firebase/database";
import { useState, useEffect, ReactNode } from "react";

type MapContextValues = {
  activeDrivers: DataSnapshot[];
  choseDriversPos: Coordinates;
  setCHosenDriversPos: Dispatch<SetStateAction<Coordinates>>;
};

const MapContext = createContext({} as MapContextValues);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [choseDriversPos, setCHosenDriversPos] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [activeDrivers, setActiveDrivers] = useState<DataSnapshot[]>([]);

  useEffect(() => {
    const drivers = ref(database, "driversPosition/");
    onChildAdded(drivers, (snapShot) => {
      const driver = snapShot.val();
      setActiveDrivers((pre: DataSnapshot[]) => {
        return [...pre, driver];
      });
    });
  }, []);

  useEffect(() => {
    const drivers = ref(database, "driversPosition/");
    onChildChanged(drivers, (snapShot) => {
      const driver = snapShot.val();
      setActiveDrivers((pre: any) => {
        return [...pre.filter((el: any) => el.email !== driver.email), driver];
      });
    });
  }, []);

  return (
    <MapContext.Provider
      value={{ activeDrivers, choseDriversPos, setCHosenDriversPos }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
