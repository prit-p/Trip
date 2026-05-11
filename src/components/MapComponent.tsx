import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { TRIP_DATA } from '../types';

// Fix for default marker icons in Leaflet with React
// Using a custom div icon for a cleaner, theme-consistent look
const createCustomIcon = (color: string) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
  className: 'custom-leaflet-icon',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const themeMarkerIcon = createCustomIcon('#3E4A3D');

export default function MapComponent() {
  const allStops = TRIP_DATA.flatMap(day => day.stops);
  const routePositions = allStops.map(stop => [stop.position.lat, stop.position.lng] as [number, number]);
  
  // Michigan-centered initial view
  const center: [number, number] = [44.5, -84.5];

  return (
    <div className="h-[450px] w-full bg-natural-stone rounded-3xl border border-natural-border overflow-hidden relative shadow-inner z-0">
      <MapContainer 
        center={center} 
        zoom={6.5} 
        scrollWheelZoom={false}
        style={{ height: '450px', width: '100%', background: '#E8E4DB' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // Applying a slight grayscale filter via CSS in the main stylesheet or inline if possible
          // But for now, standard OSM is fine.
        />
        
        <ZoomControl position="bottomright" />
        
        <Polyline 
          positions={routePositions} 
          pathOptions={{ 
            color: '#B89E7E', 
            weight: 4, 
            opacity: 0.8,
            dashArray: '8, 8'
          }} 
        />

        {allStops.map((stop, idx) => (
          <Marker 
            key={`${stop.name}-${idx}`} 
            position={[stop.position.lat, stop.position.lng]} 
            icon={themeMarkerIcon}
          >
            <Popup>
              <div className="font-sans">
                <strong className="text-natural-accent">{stop.name}</strong>
                <p className="text-xs text-slate-600 mt-1">{stop.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-[10px] text-[#4A4339] border border-natural-border shadow-sm flex items-center gap-2">
        <div className="w-3 h-0.5 bg-natural-tan border-t border-dashed border-natural-tan" />
        <span>Scenic Route Preview (Free OpenStreetMap)</span>
      </div>
    </div>
  );
}
