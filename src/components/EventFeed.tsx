import { GeoEvent, categoryMeta } from '@/data/monitoringData';

interface EventFeedProps {
  events: GeoEvent[];
  onSelect: (e: GeoEvent) => void;
}

const timeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return 'JUST NOW';
  if (mins < 60) return `${mins}M AGO`;
  return `${Math.floor(mins / 60)}H AGO`;
};

const threatDot: Record<string, string> = {
  critical: 'bg-threat-critical',
  high: 'bg-threat-high',
  medium: 'bg-threat-medium',
  low: 'bg-threat-low',
  info: 'bg-threat-info',
};

const EventFeed = ({ events, onSelect }: EventFeedProps) => (
  <div className="w-72 bg-card border-l border-border flex flex-col shrink-0 hidden lg:flex">
    <div className="px-4 py-3 border-b border-border">
      <h2 className="text-xs font-mono font-bold text-muted-foreground tracking-wider">
        LIVE EVENT FEED
      </h2>
    </div>
    <div className="flex-1 overflow-y-auto">
      {events
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .map(event => (
          <button
            key={event.id}
            onClick={() => onSelect(event)}
            className="w-full text-left px-4 py-3 border-b border-border/50 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${threatDot[event.threat]} ${
                event.threat === 'critical' ? 'animate-pulse' : ''
              }`} />
              <span className="text-[10px] font-mono text-muted-foreground">{timeAgo(event.timestamp)}</span>
              <span className="text-base ml-auto">{categoryMeta[event.category].icon}</span>
            </div>
            <p className="text-xs font-mono font-medium text-foreground leading-tight">
              {event.title}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1 line-clamp-2">
              {event.description}
            </p>
          </button>
        ))}
    </div>
  </div>
);

export default EventFeed;
