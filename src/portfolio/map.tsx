import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
      center={[45.7578, 4.8322]}
      zoom={12}
	  zoomControl={false}
      attributionControl={false}
      style={{
		height: "200px",
        width: "100%",
		overflow: "hidden",
		borderRadius: "16px",
      }}
    >
      <TileLayer
        url="https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=cb1_4bjn_1_a3d3f8a2aaf2d0cbd6181d6f"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution/">CARTO</a>'
        maxZoom={20}
      />
    </MapContainer>
  );
}



