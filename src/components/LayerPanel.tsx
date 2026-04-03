import { EventCategory, categoryMeta } from '@/data/monitoringData';

interface LayerPanelProps {
  activeLayers: Set<EventCategory>;
  onToggle: (cat: EventCategory) => void;
  eventCounts: Record<EventCategory, number>;
}

const allCategories: EventCategory[] = [
  'conflict', 'military_base', 'nuclear_site', 'cyber_attack',
  'naval_movement', 'shipping', 'geopolitical', 'natural_disaster',
  'cable', 'pipeline',
];

const LayerPanel = ({ activeLayers, onToggle, eventCounts }: LayerPanelProps) => (
  <div className="w-56 bg-card border-r border-border flex flex-col shrink-0">
    <div className="px-4 py-3 border-b border-border">
      <h2 className="text-xs font-mono font-bold text-muted-foreground tracking-wider">
        MONITORING LAYERS
      </h2>
    </div>
    <div className="flex-1 overflow-y-auto py-2">
      {allCategories.map(cat => {
        const meta = categoryMeta[cat];
        const active = activeLayers.has(cat);
        const count = eventCounts[cat] || 0;
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
              active
                ? 'text-foreground bg-secondary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
            }`}
          >
            <span className="text-base">{meta.icon}</span>
            <span className="text-xs font-mono font-medium flex-1 uppercase tracking-wide">
              {meta.label}
            </span>
            <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
              active ? `bg-${meta.color}/20 text-${meta.color}` : 'text-muted-foreground'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default LayerPanel;
