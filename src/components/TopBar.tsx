import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const utc = time.toISOString();
  const timeStr = utc.slice(11, 19);
  const dateStr = time.toLocaleDateString('en-US', { 
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' 
  }).toUpperCase();

  return (
    <header className="h-11 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-3 md:px-5 shrink-0 z-50">
      <div className="flex items-center gap-2.5">
        <Shield className="w-4 h-4 text-primary" />
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-foreground">
          GLOBAL SENTINEL
        </span>
        <span className="hidden md:inline text-[10px] font-mono text-muted-foreground tracking-wider ml-1">
          SITUATIONAL AWARENESS PLATFORM
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-threat-low opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-threat-low" />
          </span>
          <span className="text-[10px] font-mono font-semibold text-threat-low tracking-wider">LIVE</span>
        </div>
        <div className="font-mono text-[11px] text-foreground/80 tabular-nums tracking-wider">
          <span className="text-muted-foreground">{dateStr} </span>
          <span className="text-foreground">{timeStr}</span>
          <span className="text-muted-foreground ml-0.5">Z</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
