import { useState, useEffect, useMemo, useCallback } from 'react';
import TopBar from '@/components/TopBar';
import RegionTabs from '@/components/RegionTabs';
import LayerPanel from '@/components/LayerPanel';
import StatsBar from '@/components/StatsBar';
import WorldMap from '@/components/WorldMap';
import NewsTicker from '@/components/NewsTicker';
import EventFeed from '@/components/EventFeed';
import {
  Region,
  EventCategory,
  GeoEvent,
  getEvents,
  getNews,
  getStats,
} from '@/data/monitoringData';

const Index = () => {
  const [region, setRegion] = useState<Region>('all');
  const [activeLayers, setActiveLayers] = useState<Set<EventCategory>>(
    new Set(['conflict', 'military_base', 'nuclear_site', 'cyber_attack', 'naval_movement', 'geopolitical', 'natural_disaster', 'shipping', 'cable', 'pipeline'])
  );
  const [events, setEvents] = useState<GeoEvent[]>(getEvents());
  const [news, setNews] = useState(getNews());
  const [selectedEvent, setSelectedEvent] = useState<GeoEvent | null>(null);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(getEvents());
      setNews(getNews());
    }, 15000);
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
    const counts: Record<string, number> = {};
    events
      .filter(e => region === 'all' || e.region === region)
      .forEach(e => { counts[e.category] = (counts[e.category] || 0) + 1; });
    return counts as Record<EventCategory, number>;
  }, [events, region]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <StatsBar {...stats} />

      <div className="flex items-center justify-center py-2 px-4 bg-card/50 border-b border-border">
        <RegionTabs active={region} onChange={setRegion} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <LayerPanel activeLayers={activeLayers} onToggle={toggleLayer} eventCounts={eventCounts} />
        <WorldMap events={filteredEvents} onSelectEvent={setSelectedEvent} selectedEvent={selectedEvent} />
        <EventFeed events={filteredEvents} onSelect={setSelectedEvent} />
      </div>

      <NewsTicker news={filteredNews} />
    </div>
  );
};

export default Index;
