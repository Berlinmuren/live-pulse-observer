import { GeoEvent, categoryMeta } from '@/data/monitoringData';
import { useState, useEffect, useCallback } from 'react';

interface WorldMapProps {
  events: GeoEvent[];
  onSelectEvent: (e: GeoEvent | null) => void;
  selectedEvent: GeoEvent | null;
}

// Mercator projection helpers
const lngToX = (lng: number, w: number) => ((lng + 180) / 360) * w;
const latToY = (lat: number, h: number) => {
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  return h / 2 - (mercN * h) / (2 * Math.PI);
};

const threatColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
  info: '#0ea5e9',
};

// Simplified world map paths (continents as rough polygons)
const continents = `
M 150,120 L 170,95 L 200,90 L 230,100 L 250,95 L 280,100 L 310,90 L 330,95 L 340,110 L 350,140 L 340,170 L 330,190 L 310,200 L 290,195 L 280,200 L 250,210 L 230,200 L 210,195 L 190,200 L 170,190 L 155,170 L 145,150 Z
M 360,100 L 380,85 L 420,80 L 460,85 L 500,90 L 530,100 L 560,95 L 590,100 L 610,110 L 620,130 L 610,150 L 600,165 L 580,175 L 560,170 L 540,175 L 520,180 L 500,175 L 480,180 L 460,185 L 440,175 L 420,165 L 400,155 L 380,140 L 365,120 Z
M 620,90 L 650,80 L 690,85 L 730,90 L 760,100 L 790,95 L 810,110 L 830,130 L 835,155 L 820,175 L 800,190 L 780,195 L 760,185 L 740,195 L 720,200 L 700,195 L 680,200 L 660,190 L 640,175 L 625,150 L 620,120 Z
M 80,170 L 120,140 L 150,140 L 175,160 L 190,185 L 200,210 L 205,240 L 195,270 L 180,300 L 160,320 L 140,330 L 120,320 L 105,300 L 95,270 L 85,240 L 80,210 Z
M 430,200 L 460,190 L 490,195 L 520,200 L 540,215 L 545,240 L 535,270 L 520,300 L 500,320 L 475,330 L 450,325 L 435,305 L 425,280 L 420,250 L 425,220 Z
M 710,280 L 740,260 L 770,265 L 790,280 L 800,305 L 790,325 L 770,335 L 745,330 L 720,315 L 710,295 Z
`;

const WorldMap = ({ events, onSelectEvent, selectedEvent }: WorldMapProps) => {
  const [pulsePhase, setPulsePhase] = useState(0);
  const W = 900;
  const H = 450;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(p => (p + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClick = useCallback((e: GeoEvent) => {
    onSelectEvent(selectedEvent?.id === e.id ? null : e);
  }, [selectedEvent, onSelectEvent]);

  return (
    <div className="flex-1 relative overflow-hidden bg-map-bg">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline z-10 pointer-events-none" />
      
      {/* Grid lines */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid */}
        {Array.from({ length: 19 }, (_, i) => (
          <line key={`vg${i}`} x1={(i * W) / 18} y1={0} x2={(i * W) / 18} y2={H}
            stroke="hsl(220, 15%, 12%)" strokeWidth={0.5} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`hg${i}`} x1={0} y1={(i * H) / 9} x2={W} y2={(i * H) / 9}
            stroke="hsl(220, 15%, 12%)" strokeWidth={0.5} />
        ))}

        {/* Continents */}
        <path d={continents} fill="hsl(220, 15%, 18%)" stroke="hsl(220, 15%, 25%)" strokeWidth={0.8} />

        {/* Connection lines for selected */}
        {selectedEvent && events.filter(e => e.region === selectedEvent.region && e.id !== selectedEvent.id).map(e => (
          <line
            key={`conn-${e.id}`}
            x1={lngToX(selectedEvent.lng, W)}
            y1={latToY(selectedEvent.lat, H)}
            x2={lngToX(e.lng, W)}
            y2={latToY(e.lat, H)}
            stroke={threatColors[selectedEvent.threat]}
            strokeWidth={0.5}
            strokeDasharray="4 4"
            opacity={0.3}
          />
        ))}

        {/* Event markers */}
        {events.map(event => {
          const x = lngToX(event.lng, W);
          const y = latToY(event.lat, H);
          const color = threatColors[event.threat];
          const isSelected = selectedEvent?.id === event.id;
          const pulseRadius = 4 + (pulsePhase % 30) * 0.3;
          const pulseOpacity = 1 - (pulsePhase % 30) / 30;

          return (
            <g key={event.id} onClick={() => handleClick(event)} className="cursor-pointer">
              {/* Pulse ring for critical */}
              {(event.threat === 'critical' || isSelected) && (
                <circle
                  cx={x} cy={y} r={pulseRadius}
                  fill="none" stroke={color} strokeWidth={0.8}
                  opacity={pulseOpacity * 0.6}
                />
              )}
              {/* Glow */}
              <circle cx={x} cy={y} r={isSelected ? 8 : 5} fill={color} opacity={0.15} />
              {/* Dot */}
              <circle cx={x} cy={y} r={isSelected ? 4 : 2.5} fill={color}
                stroke={isSelected ? '#fff' : 'none'} strokeWidth={isSelected ? 1 : 0} />
            </g>
          );
        })}
      </svg>

      {/* Event detail popup */}
      {selectedEvent && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 intel-card fade-in z-20">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span>{categoryMeta[selectedEvent.category].icon}</span>
              <h3 className="text-sm font-mono font-bold text-foreground">{selectedEvent.title}</h3>
            </div>
            <button onClick={() => onSelectEvent(null)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{selectedEvent.description}</p>
          <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
            <span className={`px-1.5 py-0.5 rounded uppercase font-bold ${
              selectedEvent.threat === 'critical' ? 'bg-threat-critical/20 text-threat-critical' :
              selectedEvent.threat === 'high' ? 'bg-threat-high/20 text-threat-high' :
              selectedEvent.threat === 'medium' ? 'bg-threat-medium/20 text-threat-medium' :
              'bg-threat-info/20 text-threat-info'
            }`}>
              {selectedEvent.threat}
            </span>
            <span>SRC: {selectedEvent.source}</span>
            <span>{selectedEvent.timestamp.toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
