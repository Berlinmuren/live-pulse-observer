import { Region, regionLabels } from '@/data/monitoringData';

interface RegionTabsProps {
  active: Region;
  onChange: (r: Region) => void;
}

const regions: Region[] = ['all', 'europe', 'americas', 'asia', 'middle_east', 'africa', 'oceania'];

const RegionTabs = ({ active, onChange }: RegionTabsProps) => (
  <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
    {regions.map(r => (
      <button
        key={r}
        onClick={() => onChange(r)}
        className={`shrink-0 px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.15em] rounded-sm transition-all duration-150 ${
          active === r
            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
      >
        {regionLabels[r]}
      </button>
    ))}
  </div>
);

export default RegionTabs;
