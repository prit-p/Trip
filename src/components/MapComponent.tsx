import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { TRIP_DATA } from '../types';

export default function MapComponent({ activeDay = 0 }: { activeDay?: number }) {
  // Ensure we don't exceed bounds
  const safeActiveDay = useMemo(() => {
    if (!TRIP_DATA || TRIP_DATA.length === 0) return 0;
    return Math.min(Math.max(0, activeDay), TRIP_DATA.length - 1);
  }, [activeDay]);
  
  const allStops = useMemo(() => TRIP_DATA.flatMap(day => day.stops), []);
  const routePositions = useMemo(() => allStops.map(stop => [stop.position.lat, stop.position.lng] as [number, number]), [allStops]);
  
  // Calculate the active segment
  // If activeDay > 0, include the last stop of the previous day to show the connection
  const activeDayPositions = useMemo(() => {
    if (!TRIP_DATA[safeActiveDay]) return [];
    const activeStops = TRIP_DATA[safeActiveDay].stops;
    const positions = activeStops.map(stop => [stop.position.lat, stop.position.lng] as [number, number]);
    
    if (safeActiveDay > 0 && TRIP_DATA[safeActiveDay - 1]) {
      const prevDayStops = TRIP_DATA[safeActiveDay - 1].stops;
      const lastStopPrevDay = prevDayStops[prevDayStops.length - 1];
      if (lastStopPrevDay) {
        positions.unshift([lastStopPrevDay.position.lat, lastStopPrevDay.position.lng]);
      }
    }
    return positions;
  }, [safeActiveDay]);

  // Custom marker icon creation inside the component
  const icons = useMemo(() => {
    if (!L || !L.divIcon) return null;
    return {
      base: L.divIcon({
        html: `<div style="background-color: #3E4A3D; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
        className: 'custom-leaflet-icon',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
      active: L.divIcon({
        html: `<div style="background-color: #E67E22; width: 14px; height: 14px; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(230,126,34,0.5);"></div>`,
        className: 'custom-leaflet-icon-active',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })
    };
  }, []);

  // Michigan-centered initial view
  const center: [number, number] = [44.5, -84.5];

  if (!allStops.length || !icons) return null;

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
        />
        
        <ZoomControl position="bottomright" />
        
        {/* Base Route (Inactive) */}
        <Polyline 
          positions={routePositions} 
          pathOptions={{ 
            color: '#B89E7E', 
            weight: 3, 
            opacity: 0.4,
            dashArray: '8, 8'
          }} 
        />

        {/* Active Route Segment */}
        <Polyline 
          positions={activeDayPositions} 
          pathOptions={{ 
            color: '#E67E22', 
            weight: 6, 
            opacity: 1,
            lineCap: 'round',
            lineJoin: 'round'
          }} 
        />

        {allStops.map((stop, idx) => {
          const isActive = TRIP_DATA[safeActiveDay].stops.some(s => s.name === stop.name);
          return (
            <Marker 
              key={`${stop.name}-${idx}`} 
              position={[stop.position.lat, stop.position.lng]} 
              icon={isActive ? icons.active : icons.base}
              zIndexOffset={isActive ? 1000 : 0}
            >
              <Popup>
                <div className="font-sans">
                  <strong className={isActive ? "text-[#E67E22]" : "text-natural-accent"}>{stop.name}</strong>
                  <p className="text-xs text-slate-600 mt-1">{stop.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-[10px] text-[#4A4339] border border-natural-border shadow-sm flex items-center gap-2">
        <div className="w-3 h-0.5 bg-natural-tan border-t border-dashed border-natural-tan" />
        <span>Scenic Route Preview (Free OpenStreetMap)</span>
      </div>
    </div>
  );
}
