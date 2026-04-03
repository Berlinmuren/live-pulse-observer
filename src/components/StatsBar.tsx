interface StatsBarProps {
  totalEvents: number;
  criticalAlerts: number;
  activeConflicts: number;
  cyberThreats: number;
  hotspots: number;
}

const StatItem = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex flex-col items-center px-4 py-2">
    <span className={`text-xl font-mono font-bold ${color}`}>{value}</span>
    <span className="text-[10px] font-mono text-muted-foreground tracking-wider mt-0.5">{label}</span>
  </div>
);

const StatsBar = (props: StatsBarProps) => (
  <div className="flex items-center justify-center gap-1 bg-card border-b border-border divide-x divide-border">
    <StatItem label="TOTAL EVENTS" value={props.totalEvents} color="text-foreground" />
    <StatItem label="CRITICAL" value={props.criticalAlerts} color="text-threat-critical" />
    <StatItem label="CONFLICTS" value={props.activeConflicts} color="text-threat-high" />
    <StatItem label="CYBER THREATS" value={props.cyberThreats} color="text-threat-info" />
    <StatItem label="HOTSPOTS" value={props.hotspots} color="text-threat-medium" />
  </div>
);

export default StatsBar;
