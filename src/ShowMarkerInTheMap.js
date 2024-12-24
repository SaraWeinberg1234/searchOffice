
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
import { useEffect } from 'react';

const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // קובץ תמונה של Leaflet
    iconSize: [25, 41], // גודל הסמן
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', 
    shadowSize: [41, 41], 
});

const UpdateMapView = ({ lat, lon }) => {
    const map = useMap();

    useEffect(() => {
        if (lat && lon) {
            map.setView([lat, lon], 13);
        }
    }, [lat, lon, map]);

    return null;
};

const ShowMarkerInTheMap = ({ lat, lon }) => {
    const position = [lat || 51.505, lon || -0.09]; // ברירת מחדל אם לא התקבלו נתונים

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* קומפוננטה שמעדכנת את מרכז המפה */}
                <UpdateMapView lat={lat} lon={lon} />
                {/* שימוש באייקון מותאם */}
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        מיקום נבחר: {position[0].toFixed(5)}, {position[1].toFixed(5)}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default ShowMarkerInTheMap;
