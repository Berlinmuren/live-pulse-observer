import { useState, useEffect, useMemo, useCallback } from 'react';
import TopBar from '@/components/TopBar';
import RegionTabs from '@/components/RegionTabs';
import LayerPanel from '@/components/LayerPanel';
import StatsBar from '@/components/StatsBar';
import WorldMap from '@/components/WorldMap';
import NewsTicker from '@/components/NewsTicker';
import EventFeed from '@/components/EventFeed';
import { Layers, List } from 'lucide-react';
import {
  Region,
  EventCategory,
  GeoEvent,
  getEvents,
  getNews,
  getStats,
} from '@/data/monitoringData';

const allLayers: EventCategory[] = [
  'conflict', 'military_base', 'nuclear_site', 'cyber_attack',
  'naval_movement', 'shipping', 'geopolitical', 'natural_disaster',
  'cable', 'pipeline',
];

const Index = () => {
  const [region, setRegion] = useState<Region>('all');
  const [activeLayers, setActiveLayers] = useState<Set<EventCategory>>(new Set(allLayers));
  const [events, setEvents] = useState<GeoEvent[]>(getEvents());
  const [news, setNews] = useState(getNews());
  const [selectedEvent, setSelectedEvent] = useState<GeoEvent | null>(null);
  const [layersPanelOpen, setLayersPanelOpen] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);

  // Simulate live data updates every 20s
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(getEvents());
      setNews(getNews());
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const toggleLayer = useCallback((cat: EventCategory) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const filteredEvents = useMemo(() =>
    events.filter(e =>
      (region === 'all' || e.region === region) &&
      activeLayers.has(e.category)
    ),
    [events, region, activeLayers]
  );

  const filteredNews = useMemo(() =>
    news.filter(n => region === 'all' || n.region === region || n.region === 'all'),
    [news, region]
  );

  const stats = useMemo(() => getStats(filteredEvents), [filteredEvents]);

  const eventCounts = useMemo(() => {
    const counts = {} as Record<EventCategory, number>;
    allLayers.forEach(c => { counts[c] = 0; });
    events
      .filter(e => region === 'all' || e.region === region)
      .forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
    return counts;
  }, [events, region]);

  const handleSelectEvent = useCallback((e: GeoEvent | null) => {
    setSelectedEvent(e);
    setFeedOpen(false);
    setLayersPanelOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />

      {/* Stats + Region bar */}
      <div className="border-b border-border">
        <StatsBar {...stats} />
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border">
          {/* Mobile toggles */}
          <button
            onClick={() => { setLayersPanelOpen(!layersPanelOpen); setFeedOpen(false); }}
            className="lg:hidden flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            LAYERS
          </button>

          <div className="flex-1 flex justify-center">
            <RegionTabs active={region} onChange={setRegion} />
          </div>

          <button
            onClick={() => { setFeedOpen(!feedOpen); setLayersPanelOpen(false); }}
            className="lg:hidden flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            FEED
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden relative">
        <LayerPanel
          activeLayers={activeLayers}
          onToggle={toggleLayer}
          eventCounts={eventCounts}
          open={layersPanelOpen}
          onClose={() => setLayersPanelOpen(false)}
        />
        <WorldMap
          events={filteredEvents}
          onSelectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
          region={region}
        />
        <EventFeed
          events={filteredEvents}
          onSelect={(e) => handleSelectEvent(e)}
          open={feedOpen}
          onClose={() => setFeedOpen(false)}
        />
      </div>

      <NewsTicker news={filteredNews} />
    </div>
  );
};

export default Index;
