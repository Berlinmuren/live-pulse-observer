import { Region, regionLabels } from '@/data/monitoringData';

interface RegionTabsProps {
  active: Region;
  onChange: (r: Region) => void;
}

const regions: Region[] = ['all', 'europe', 'americas', 'asia', 'middle_east', 'africa', 'oceania'];

const RegionTabs = ({ active, onChange }: RegionTabsProps) => (
  <div className="flex items-center gap-1 bg-card border border-border rounded-md p-1">
    {regions.map(r => (
      <button
        key={r}
        onClick={() => onChange(r)}
        className={`px-3 py-1.5 text-xs font-mono font-semibold rounded transition-all ${
          active === r
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
      >
        {regionLabels[r]}
      </button>
    ))}
  </div>
);

export default RegionTabs;
