import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapContext } from "../context";
import { Popup, Marker, TileLayer, MapContainer } from "react-leaflet";

export const MapSection = () => {
  const { activeDrivers } = useMapContext();
  const getIcon = () => {
    return icon({
      iconSize: 20 as any,
      iconUrl: require("../assets/bus.png"),
      className: "rounded-full duration-1000",
    });
  };
  
  return (
    <MapContainer
      zoom={12}
      center={{ lat: 47.91, lng: 106.9 }}
      className="w-[calc(100vw-240px)] h-screen"
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BlX75aexttP0PZgDJuki"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {activeDrivers.map((driver: any, id) => {
        return (
          <Marker
            key={id}
            icon={getIcon()}
            position={{
              lat: driver.location.latitude,
              lng: driver.location.longitude,
            }}
          >
            <Popup>
              <h3 className="mb-1">{driver.fullname}</h3>
              <h3>{driver.phonenumber}</h3>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
