import { memo, useCallback, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { GeoEvent, categoryMeta, threatColors, regionCenters, Region } from '@/data/monitoringData';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  events: GeoEvent[];
  onSelectEvent: (e: GeoEvent | null) => void;
  selectedEvent: GeoEvent | null;
  region: Region;
}

const WorldMapInner = ({ events, onSelectEvent, selectedEvent, region }: WorldMapProps) => {
  const [tooltipEvent, setTooltipEvent] = useState<GeoEvent | null>(null);
  const { center, zoom } = regionCenters[region];

  const handleMarkerClick = useCallback((e: GeoEvent) => {
    onSelectEvent(selectedEvent?.id === e.id ? null : e);
  }, [selectedEvent, onSelectEvent]);

  return (
    <div className="flex-1 relative overflow-hidden bg-background">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130 * zoom,
          center: center,
        }}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup center={center} zoom={1} minZoom={0.8} maxZoom={6}>
          {/* Grid lines */}
          {Array.from({ length: 37 }, (_, i) => {
            const lng = -180 + i * 10;
            return (
              <line
                key={`vlng${i}`}
                x1={0} y1={0} x2={0} y2={0}
                style={{ display: 'none' }}
              />
            );
          })}

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(222, 25%, 15%)"
                  stroke="hsl(222, 20%, 22%)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: 'hsl(222, 25%, 20%)', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Event markers */}
          {events.map(event => {
            const color = threatColors[event.threat];
            const isSelected = selectedEvent?.id === event.id;
            const isCritical = event.threat === 'critical';

            return (
              <Marker
                key={event.id}
                coordinates={[event.lng, event.lat]}
                onClick={() => handleMarkerClick(event)}
                onMouseEnter={() => setTooltipEvent(event)}
                onMouseLeave={() => setTooltipEvent(null)}
              >
                {/* Pulse ring for critical/selected */}
                {(isCritical || isSelected) && (
                  <circle r={8} fill="none" stroke={color} strokeWidth={0.8} className="marker-pulse" opacity={0.6} />
                )}
                {/* Outer glow */}
                <circle r={isSelected ? 7 : 5} fill={color} opacity={0.12} />
                {/* Inner dot */}
                <circle
                  r={isSelected ? 4 : isCritical ? 3 : 2.5}
                  fill={color}
                  stroke={isSelected ? '#ffffff' : 'none'}
                  strokeWidth={isSelected ? 1 : 0}
                  className="cursor-pointer"
                  style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                />
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipEvent && !selectedEvent && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur border border-border rounded-sm px-3 py-2 pointer-events-none z-20 fade-up max-w-[280px]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{categoryMeta[tooltipEvent.category].icon}</span>
            <span className="text-[11px] font-mono font-bold text-foreground truncate">{tooltipEvent.title}</span>
          </div>
        </div>
      )}

      {/* Selected event detail panel */}
      {selectedEvent && (
        <div className="absolute bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-80 bg-card/95 backdrop-blur border border-border rounded-sm p-3 z-20 fade-up intel-glow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm">{categoryMeta[selectedEvent.category].icon}</span>
              <h3 className="text-xs font-mono font-bold text-foreground truncate">{selectedEvent.title}</h3>
            </div>
            <button
              onClick={() => onSelectEvent(null)}
              className="text-muted-foreground hover:text-foreground text-xs font-mono shrink-0 px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-2.5">{selectedEvent.description}</p>
          <div className="flex items-center gap-2 text-[9px] font-mono">
            <span
              className="px-1.5 py-0.5 rounded-sm uppercase font-bold"
              style={{
                backgroundColor: `${threatColors[selectedEvent.threat]}20`,
                color: threatColors[selectedEvent.threat],
              }}
            >
              {selectedEvent.threat}
            </span>
            <span className="text-muted-foreground">SRC: {selectedEvent.source}</span>
            <span className="text-muted-foreground ml-auto tabular-nums">
              {selectedEvent.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
            </span>
          </div>
        </div>
      )}

      {/* Corner coordinates display */}
      <div className="absolute top-2 right-2 text-[8px] font-mono text-muted-foreground/40 tracking-wider pointer-events-none hidden md:block">
        {center[1].toFixed(1)}°N {center[0].toFixed(1)}°E
      </div>
    </div>
  );
};

const WorldMap = memo(WorldMapInner);
export default WorldMap;
