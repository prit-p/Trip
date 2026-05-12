import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TRIP_DATA } from '../types';

// Helper component to fix map size issues and ensure map is ready
function MapController() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function MapComponent({ activeDay = 0 }: { activeDay?: number }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safe data access
  const safeData = useMemo(() => {
    const data = TRIP_DATA || [];
    const index = Math.min(Math.max(0, activeDay), Math.max(0, data.length - 1));
    return { data, activeIndex: index };
  }, [activeDay]);

  const { data, activeIndex } = safeData;
  const currentDay = data[activeIndex];

  const allStops = useMemo(() => {
    return data.flatMap(day => day.stops || []);
  }, [data]);

  const routePositions = useMemo(() => 
    allStops.map(stop => [stop.position.lat, stop.position.lng] as [number, number]), 
    [allStops]
  );
  
  // Calculate the active segment
  const activeDayPositions = useMemo(() => {
    if (!currentDay) return [];
    
    const activeStops = currentDay.stops || [];
    const positions = activeStops.map(stop => [stop.position.lat, stop.position.lng] as [number, number]);
    
    if (activeIndex > 0 && data[activeIndex - 1]) {
      const prevDayStops = data[activeIndex - 1].stops || [];
      const lastStopPrevDay = prevDayStops[prevDayStops.length - 1];
      if (lastStopPrevDay) {
        positions.unshift([lastStopPrevDay.position.lat, lastStopPrevDay.position.lng]);
      }
    }
    return positions;
  }, [currentDay, activeIndex, data]);

  // Custom marker icons
  const icons = useMemo(() => {
    if (!isMounted) return null;
    
    // Fallback if L is not properly loaded or bundled
    const leaflet = L;
    if (!leaflet || !leaflet.divIcon) return null;

    try {
      return {
        base: leaflet.divIcon({
          html: `<div style="background-color: #3E4A3D; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
          className: 'custom-leaflet-icon',
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        }),
        active: leaflet.divIcon({
          html: `<div style="background-color: #E67E22; width: 14px; height: 14px; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 0 6px rgba(230,126,34,0.5);"></div>`,
          className: 'custom-leaflet-icon-active',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })
      };
    } catch (e) {
      console.error('Marker creation failed:', e);
      return null;
    }
  }, [isMounted]);

  const center: [number, number] = [44.5, -84.5];

  if (!isMounted || !allStops.length || !icons) {
    return (
      <div className="h-[450px] w-full bg-natural-stone rounded-3xl border border-natural-border flex items-center justify-center">
        <div className="text-xs text-natural-accent font-medium tracking-widest uppercase animate-pulse">
          Loading Scenic Map...
        </div>
      </div>
    );
  }

  return (
    <div className="h-[450px] w-full bg-natural-stone rounded-3xl border border-natural-border overflow-hidden relative shadow-inner z-0">
      <MapContainer 
        center={center} 
        zoom={6.5} 
        scrollWheelZoom={false}
        style={{ height: '450px', width: '100%' }}
        zoomControl={false}
      >
        <MapController />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="bottomright" />
        
        {/* Base Route (Inactive) */}
        <Polyline 
          positions={routePositions} 
          pathOptions={{ 
            color: '#B89E7E', 
            weight: 3, 
            opacity: 0.3,
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
          const isActive = currentDay.stops.some(s => s.name === stop.name);
          return (
            <Marker 
              key={`${stop.name}-${idx}`} 
              position={[stop.position.lat, stop.position.lng]} 
              icon={isActive ? icons.active : icons.base}
              zIndexOffset={isActive ? 1000 : 0}
            >
              <Popup>
                <div className="font-sans min-w-[120px]">
                  <strong className={isActive ? "text-[#E67E22]" : "text-natural-accent"}>{stop.name}</strong>
                  <p className="text-[10px] text-slate-600 mt-1 leading-tight">{stop.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-[10px] text-[#4A4339] border border-natural-border shadow-sm flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#E67E22]/20 border border-[#E67E22] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#E67E22]" />
        </div>
        <span>Highlighted route for {currentDay.date}</span>
      </div>
    </div>
  );
}
