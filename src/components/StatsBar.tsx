import { AlertTriangle, Activity, Wifi, Crosshair, Zap } from 'lucide-react';

interface StatsBarProps {
  totalEvents: number;
  criticalAlerts: number;
  activeConflicts: number;
  cyberThreats: number;
  hotspots: number;
}

const items = [
  { key: 'totalEvents', label: 'EVENTS', icon: Activity, color: 'text-foreground' },
  { key: 'criticalAlerts', label: 'CRITICAL', icon: AlertTriangle, color: 'text-threat-critical' },
  { key: 'activeConflicts', label: 'CONFLICTS', icon: Crosshair, color: 'text-threat-high' },
  { key: 'cyberThreats', label: 'CYBER', icon: Wifi, color: 'text-threat-info' },
  { key: 'hotspots', label: 'HOTSPOTS', icon: Zap, color: 'text-threat-medium' },
] as const;

const StatsBar = (props: StatsBarProps) => (
  <div className="grid grid-cols-5 gap-1.5 px-3 py-2">
    {items.map(({ key, label, icon: Icon, color }) => (
      <div key={key} className="stat-card flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-1">
          <Icon className={`w-3 h-3 ${color} opacity-60`} />
          <span className={`text-base md:text-lg font-mono font-bold tabular-nums ${color}`}>
            {props[key]}
          </span>
        </div>
        <span className="text-[8px] md:text-[9px] font-mono text-muted-foreground tracking-[0.15em]">
          {label}
        </span>
      </div>
    ))}
  </div>
);

export default StatsBar;
