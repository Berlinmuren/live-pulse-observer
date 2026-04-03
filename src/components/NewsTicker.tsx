import { NewsItem } from '@/data/monitoringData';
import { useEffect, useRef } from 'react';

interface NewsTickerProps {
  news: NewsItem[];
}

const threatBadge = (threat: string) => {
  const colors: Record<string, string> = {
    critical: 'bg-threat-critical text-primary-foreground',
    high: 'bg-threat-high text-accent-foreground',
    medium: 'bg-threat-medium text-accent-foreground',
    low: 'bg-threat-low text-primary-foreground',
    info: 'bg-threat-info text-primary-foreground',
  };
  return colors[threat] || colors.info;
};

const NewsTicker = ({ news }: NewsTickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = el.scrollWidth;
    const speed = 1;
    let animFrame: number;
    const animate = () => {
      pos -= speed;
      if (pos < -el.scrollWidth / 2) pos = el.clientWidth;
      el.style.transform = `translateX(${pos}px)`;
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [news]);

  return (
    <div className="h-10 bg-card border-t border-border flex items-center overflow-hidden shrink-0">
      <div className="shrink-0 px-3 flex items-center gap-2 border-r border-border h-full">
        <div className="w-1.5 h-1.5 rounded-full bg-threat-critical blink" />
        <span className="text-xs font-mono font-bold text-threat-critical">BREAKING</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div ref={scrollRef} className="flex items-center gap-8 whitespace-nowrap">
          {[...news, ...news].map((item, i) => (
            <span key={`${item.id}-${i}`} className="inline-flex items-center gap-2 text-xs font-mono">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${threatBadge(item.threat)}`}>
                {item.threat}
              </span>
              <span className="text-foreground">{item.headline}</span>
              <span className="text-muted-foreground">— {item.source}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
