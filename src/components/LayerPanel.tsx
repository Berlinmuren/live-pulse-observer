import { EventCategory, categoryMeta } from '@/data/monitoringData';
import { ChevronRight } from 'lucide-react';

interface LayerPanelProps {
  activeLayers: Set<EventCategory>;
  onToggle: (cat: EventCategory) => void;
  eventCounts: Record<EventCategory, number>;
  open: boolean;
  onClose: () => void;
}

const allCategories: EventCategory[] = [
  'conflict', 'military_base', 'nuclear_site', 'cyber_attack',
  'naval_movement', 'shipping', 'geopolitical', 'natural_disaster',
  'cable', 'pipeline',
];

const LayerPanel = ({ activeLayers, onToggle, eventCounts, open, onClose }: LayerPanelProps) => (
  <>
    {/* Backdrop for mobile */}
    {open && (
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
    )}
    <aside className={`
      fixed lg:relative top-0 left-0 h-full z-50 lg:z-auto
      w-52 bg-card border-r border-border flex flex-col shrink-0
      transition-transform duration-200 ease-out
      ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
        <h2 className="text-[10px] font-mono font-bold text-muted-foreground tracking-[0.2em]">
          LAYERS
        </h2>
        <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {allCategories.map(cat => {
          const meta = categoryMeta[cat];
          const active = activeLayers.has(cat);
          const count = eventCounts[cat] || 0;
          return (
            <button
              key={cat}
              onClick={() => onToggle(cat)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-all duration-100 ${
                active
                  ? 'text-foreground'
                  : 'text-muted-foreground/60'
              } hover:bg-secondary/40`}
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                active ? `bg-${meta.color}` : 'bg-muted-foreground/30'
              }`} style={{
                backgroundColor: active ? meta.dotColor : undefined
              }} />
              <span className="text-[10px] font-mono font-medium flex-1 tracking-wide">
                {meta.label}
              </span>
              {count > 0 && (
                <span className={`text-[9px] font-mono font-bold tabular-nums ${
                  active ? 'text-foreground/70' : 'text-muted-foreground/40'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  </>
);

export default LayerPanel;
