import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export const MapSection = () => {
  return (
    <MapContainer
      zoom={15}
      className="w-[calc(100vw-240px)] h-screen"
      center={{ lat: 47.91660524732946, lng: 106.96457125140142 }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=BlX75aexttP0PZgDJuki"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
    </MapContainer>
  );
};
