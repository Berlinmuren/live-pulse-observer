import { GeoEvent, categoryMeta } from '@/data/monitoringData';
import { Clock } from 'lucide-react';

interface EventFeedProps {
  events: GeoEvent[];
  onSelect: (e: GeoEvent) => void;
  open: boolean;
  onClose: () => void;
}

const timeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return 'NOW';
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h`;
};

const threatBarColor: Record<string, string> = {
  critical: 'bg-threat-critical',
  high: 'bg-threat-high',
  medium: 'bg-threat-medium',
  low: 'bg-threat-low',
  info: 'bg-threat-info',
};

const EventFeed = ({ events, onSelect, open, onClose }: EventFeedProps) => (
  <>
    {open && (
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
    )}
    <aside className={`
      fixed lg:relative top-0 right-0 h-full z-50 lg:z-auto
      w-64 bg-card border-l border-border flex flex-col shrink-0
      transition-transform duration-200 ease-out
      ${open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
    `}>
      <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
        <h2 className="text-[10px] font-mono font-bold text-muted-foreground tracking-[0.2em]">
          LIVE FEED
        </h2>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="text-[9px] font-mono">{events.length} events</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {events
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .map(event => (
            <button
              key={event.id}
              onClick={() => onSelect(event)}
              className="w-full text-left px-3 py-2.5 border-b border-border/40 hover:bg-secondary/30 transition-colors group relative"
            >
              {/* Threat indicator bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${threatBarColor[event.threat]} ${
                event.threat === 'critical' ? 'blink-slow' : ''
              }`} />
              
              <div className="flex items-center gap-1.5 mb-1 pl-2">
                <span className="text-[10px]">{categoryMeta[event.category].icon}</span>
                <span className="text-[9px] font-mono text-muted-foreground tabular-nums">
                  {timeAgo(event.timestamp)}
                </span>
              </div>
              <p className="text-[11px] font-medium text-foreground leading-snug pl-2 group-hover:text-primary transition-colors">
                {event.title}
              </p>
              <p className="text-[9px] font-mono text-muted-foreground mt-0.5 pl-2 line-clamp-1">
                {event.description}
              </p>
            </button>
          ))}
      </div>
    </aside>
  </>
);

export default EventFeed;
