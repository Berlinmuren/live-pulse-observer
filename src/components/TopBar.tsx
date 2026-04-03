import { useEffect, useState } from 'react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());
  const [threatLevel, setThreatLevel] = useState('ELEVATED');

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const levels = ['ELEVATED', 'HIGH', 'ELEVATED', 'SEVERE'];
    const interval = setInterval(() => {
      setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const threatColor = threatLevel === 'SEVERE' ? 'text-threat-critical' : threatLevel === 'HIGH' ? 'text-threat-high' : 'text-threat-medium';

  return (
    <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-threat-critical animate-pulse" />
          <span className="font-mono text-sm font-bold tracking-wider text-foreground">
            GLOBAL SENTINEL
          </span>
        </div>
        <span className="text-muted-foreground text-xs font-mono hidden md:inline">
          GEOPOLITICAL MONITORING SYSTEM v4.2
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">THREAT LEVEL:</span>
          <span className={`text-xs font-mono font-bold ${threatColor}`}>
            {threatLevel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-threat-low animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono">LIVE</span>
        </div>

        <div className="font-mono text-xs text-foreground tabular-nums">
          <span className="text-muted-foreground mr-1">UTC</span>
          {time.toUTCString().slice(17, 25)}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
