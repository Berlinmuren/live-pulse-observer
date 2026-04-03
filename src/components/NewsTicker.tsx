import { NewsItem } from '@/data/monitoringData';
import { useRef, useEffect, useState } from 'react';

interface NewsTickerProps {
  news: NewsItem[];
}

const threatDot: Record<string, string> = {
  critical: 'bg-threat-critical',
  high: 'bg-threat-high',
  medium: 'bg-threat-medium',
  low: 'bg-threat-low',
  info: 'bg-threat-info',
};

const NewsTicker = ({ news }: NewsTickerProps) => {
  const [duplicatedNews] = useState(() => [...news, ...news]);

  return (
    <div className="h-8 bg-card/90 backdrop-blur-sm border-t border-border flex items-center overflow-hidden shrink-0">
      <div className="shrink-0 px-2.5 flex items-center gap-1.5 border-r border-border h-full bg-primary/5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        <span className="text-[9px] font-mono font-bold text-primary tracking-[0.15em]">FEED</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="news-scroll flex items-center gap-10 whitespace-nowrap">
          {duplicatedNews.map((item, i) => (
            <span key={`${item.id}-${i}`} className="inline-flex items-center gap-2 text-[10px] font-mono">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${threatDot[item.threat]}`} />
              <span className="text-foreground/80">{item.headline}</span>
              <span className="text-muted-foreground/50">({item.source})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
