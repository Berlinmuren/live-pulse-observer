export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type EventCategory = 
  | 'conflict' 
  | 'military_base' 
  | 'nuclear_site' 
  | 'cyber_attack' 
  | 'naval_movement' 
  | 'pipeline' 
  | 'cable' 
  | 'shipping' 
  | 'geopolitical' 
  | 'natural_disaster';

export type Region = 'all' | 'europe' | 'americas' | 'asia' | 'africa' | 'middle_east' | 'oceania';

export interface GeoEvent {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  category: EventCategory;
  threat: ThreatLevel;
  region: Region;
  timestamp: Date;
  source?: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  timestamp: Date;
  threat: ThreatLevel;
  region: Region;
}

export const categoryMeta: Record<EventCategory, { label: string; icon: string; color: string }> = {
  conflict: { label: 'Conflict Zones', icon: '⚔️', color: 'threat-critical' },
  military_base: { label: 'Military Bases', icon: '🏛️', color: 'threat-high' },
  nuclear_site: { label: 'Nuclear Sites', icon: '☢️', color: 'threat-medium' },
  cyber_attack: { label: 'Cyber Attacks', icon: '💻', color: 'threat-info' },
  naval_movement: { label: 'Naval Movements', icon: '🚢', color: 'threat-info' },
  pipeline: { label: 'Pipelines', icon: '🔧', color: 'threat-low' },
  cable: { label: 'Undersea Cables', icon: '🔗', color: 'threat-low' },
  shipping: { label: 'Shipping Routes', icon: '📦', color: 'threat-info' },
  geopolitical: { label: 'Geopolitical Events', icon: '🌍', color: 'threat-medium' },
  natural_disaster: { label: 'Natural Disasters', icon: '🌋', color: 'threat-high' },
};

export const regionLabels: Record<Region, string> = {
  all: 'GLOBAL',
  europe: 'EUROPE',
  americas: 'AMERICAS',
  asia: 'ASIA',
  africa: 'AFRICA',
  middle_east: 'MIDDLE EAST',
  oceania: 'OCEANIA',
};

const baseEvents: GeoEvent[] = [
  { id: 'e1', lat: 48.3794, lng: 31.1656, title: 'Active Conflict Zone - Ukraine', description: 'Ongoing military operations in eastern regions', category: 'conflict', threat: 'critical', region: 'europe', timestamp: new Date(), source: 'OSINT' },
  { id: 'e2', lat: 15.3694, lng: 44.191, title: 'Yemen - Houthi Activity', description: 'Red Sea shipping disruptions continue', category: 'conflict', threat: 'critical', region: 'middle_east', timestamp: new Date(), source: 'Naval Intel' },
  { id: 'e3', lat: 33.8938, lng: 35.5018, title: 'Lebanon - Border Tensions', description: 'Increased military posturing along southern border', category: 'conflict', threat: 'high', region: 'middle_east', timestamp: new Date(), source: 'SIGINT' },
  { id: 'e4', lat: 11.8251, lng: 42.5903, title: 'Djibouti - Naval Base', description: 'Multi-national naval base operations', category: 'military_base', threat: 'medium', region: 'africa', timestamp: new Date(), source: 'Satellite' },
  { id: 'e5', lat: 25.2854, lng: 51.531, title: 'Qatar - Al Udeid Air Base', description: 'US CENTCOM forward headquarters', category: 'military_base', threat: 'low', region: 'middle_east', timestamp: new Date(), source: 'Public' },
  { id: 'e6', lat: 51.4, lng: -1.3, title: 'UK - AWE Aldermaston', description: 'Nuclear weapons establishment', category: 'nuclear_site', threat: 'info', region: 'europe', timestamp: new Date(), source: 'Public' },
  { id: 'e7', lat: 37.2, lng: 127.0, title: 'South Korea - Cyber Defense Center', description: 'Increased DPRK cyber operations detected', category: 'cyber_attack', threat: 'high', region: 'asia', timestamp: new Date(), source: 'SIGINT' },
  { id: 'e8', lat: 1.3521, lng: 103.8198, title: 'Singapore Strait - Naval Activity', description: 'Carrier strike group transit', category: 'naval_movement', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'AIS Data' },
  { id: 'e9', lat: 31.7683, lng: 35.2137, title: 'Israel - Gaza Operations', description: 'Ongoing military operations', category: 'conflict', threat: 'critical', region: 'middle_east', timestamp: new Date(), source: 'OSINT' },
  { id: 'e10', lat: 23.4241, lng: 53.8478, title: 'UAE - Critical Infrastructure', description: 'Pipeline monitoring alert', category: 'pipeline', threat: 'low', region: 'middle_east', timestamp: new Date(), source: 'SCADA' },
  { id: 'e11', lat: 8.9806, lng: -79.5188, title: 'Panama Canal - Shipping', description: 'Reduced capacity due to drought conditions', category: 'shipping', threat: 'medium', region: 'americas', timestamp: new Date(), source: 'Maritime' },
  { id: 'e12', lat: 55.7558, lng: 37.6173, title: 'Moscow - Geopolitical Center', description: 'Diplomatic tensions escalating', category: 'geopolitical', threat: 'high', region: 'europe', timestamp: new Date(), source: 'Diplomatic' },
  { id: 'e13', lat: 39.9042, lng: 116.4074, title: 'Beijing - Strategic Posturing', description: 'Military exercises in South China Sea announced', category: 'geopolitical', threat: 'high', region: 'asia', timestamp: new Date(), source: 'OSINT' },
  { id: 'e14', lat: 22.3193, lng: 114.1694, title: 'South China Sea - Submarine Cable', description: 'Undersea cable integrity monitoring', category: 'cable', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'Subsea Intel' },
  { id: 'e15', lat: 64.2008, lng: -149.4937, title: 'Alaska - Early Warning', description: 'Missile defense radar station active', category: 'military_base', threat: 'low', region: 'americas', timestamp: new Date(), source: 'DoD' },
  { id: 'e16', lat: 4.0511, lng: 9.7085, title: 'Gulf of Guinea - Piracy', description: 'Increased piracy incidents reported', category: 'naval_movement', threat: 'high', region: 'africa', timestamp: new Date(), source: 'IMB' },
  { id: 'e17', lat: 35.6762, lng: 139.6503, title: 'Japan - Earthquake Alert', description: 'Seismic activity near Nankai Trough', category: 'natural_disaster', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'USGS' },
  { id: 'e18', lat: 38.7223, lng: -9.1393, title: 'Portugal - NATO Exercise', description: 'Joint naval exercise in progress', category: 'naval_movement', threat: 'info', region: 'europe', timestamp: new Date(), source: 'NATO' },
  { id: 'e19', lat: -33.9, lng: 18.4, title: 'Cape Town - Submarine Cable Hub', description: 'Critical internet infrastructure node', category: 'cable', threat: 'low', region: 'africa', timestamp: new Date(), source: 'TeleGeography' },
  { id: 'e20', lat: 25.276, lng: 55.296, title: 'Dubai - Cyber Threat', description: 'State-sponsored cyber campaign detected', category: 'cyber_attack', threat: 'high', region: 'middle_east', timestamp: new Date(), source: 'CERT' },
  { id: 'e21', lat: 14.058, lng: 108.277, title: 'Vietnam - SCS Tensions', description: 'Maritime boundary disputes active', category: 'geopolitical', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'UNCLOS' },
  { id: 'e22', lat: -6.2088, lng: 106.8456, title: 'Indonesia - Volcano Activity', description: 'Mount Merapi eruption warning raised', category: 'natural_disaster', threat: 'high', region: 'asia', timestamp: new Date(), source: 'PVMBG' },
  { id: 'e23', lat: 50.4501, lng: 30.5234, title: 'Kyiv - Drone Attacks', description: 'Aerial drone intercepts ongoing', category: 'conflict', threat: 'critical', region: 'europe', timestamp: new Date(), source: 'UkrAF' },
  { id: 'e24', lat: 12.8628, lng: 45.0286, title: 'Bab el-Mandeb - Shipping', description: 'Commercial shipping rerouting continues', category: 'shipping', threat: 'high', region: 'middle_east', timestamp: new Date(), source: 'Lloyd\'s' },
];

const baseNews: NewsItem[] = [
  { id: 'n1', headline: 'NATO allies increase defense spending amid rising geopolitical tensions', source: 'Reuters', timestamp: new Date(), threat: 'medium', region: 'europe' },
  { id: 'n2', headline: 'Cyber attack targets critical infrastructure in Eastern Europe', source: 'BBC', timestamp: new Date(), threat: 'critical', region: 'europe' },
  { id: 'n3', headline: 'Red Sea shipping disruptions cause global supply chain delays', source: 'Bloomberg', timestamp: new Date(), threat: 'high', region: 'middle_east' },
  { id: 'n4', headline: 'South China Sea military exercises raise regional concerns', source: 'AP', timestamp: new Date(), threat: 'high', region: 'asia' },
  { id: 'n5', headline: 'UN Security Council emergency session on Middle East crisis', source: 'Al Jazeera', timestamp: new Date(), threat: 'critical', region: 'middle_east' },
  { id: 'n6', headline: 'Submarine cable disruption affects internet connectivity in Africa', source: 'TechCrunch', timestamp: new Date(), threat: 'medium', region: 'africa' },
  { id: 'n7', headline: 'Nuclear non-proliferation talks stall as tensions escalate', source: 'Guardian', timestamp: new Date(), threat: 'high', region: 'all' },
  { id: 'n8', headline: 'Panama Canal drought restrictions impact global trade routes', source: 'Financial Times', timestamp: new Date(), threat: 'medium', region: 'americas' },
  { id: 'n9', headline: 'Belgium detains three suspected Congo war crimes probe suspects', source: 'France24', timestamp: new Date(), threat: 'medium', region: 'europe' },
  { id: 'n10', headline: 'Arctic military buildup accelerates amid resource competition', source: 'Reuters', timestamp: new Date(), threat: 'medium', region: 'europe' },
  { id: 'n11', headline: 'Major earthquake warning issued for Pacific Ring of Fire region', source: 'USGS', timestamp: new Date(), threat: 'high', region: 'asia' },
  { id: 'n12', headline: 'Global ransomware campaign targets energy sector infrastructure', source: 'Wired', timestamp: new Date(), threat: 'critical', region: 'all' },
];

export function getEvents(): GeoEvent[] {
  return baseEvents.map(e => ({
    ...e,
    timestamp: new Date(Date.now() - Math.random() * 3600000 * 4),
  }));
}

export function getNews(): NewsItem[] {
  return baseNews.map(n => ({
    ...n,
    timestamp: new Date(Date.now() - Math.random() * 3600000 * 2),
  }));
}

export function getStats(events: GeoEvent[]) {
  return {
    totalEvents: events.length,
    criticalAlerts: events.filter(e => e.threat === 'critical').length,
    activeConflicts: events.filter(e => e.category === 'conflict').length,
    cyberThreats: events.filter(e => e.category === 'cyber_attack').length,
    hotspots: events.filter(e => e.threat === 'critical' || e.threat === 'high').length,
  };
}
