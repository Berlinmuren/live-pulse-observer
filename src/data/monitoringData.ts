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

export const threatColors: Record<ThreatLevel, string> = {
  critical: '#dc2626',
  high: '#f97316',
  medium: '#eab308',
  low: '#16a34a',
  info: '#0ea5e9',
};

export const categoryMeta: Record<EventCategory, { label: string; icon: string; color: string; dotColor: string }> = {
  conflict: { label: 'CONFLICT ZONES', icon: '⚔️', color: 'threat-critical', dotColor: '#dc2626' },
  military_base: { label: 'MILITARY BASES', icon: '🏛️', color: 'threat-high', dotColor: '#f97316' },
  nuclear_site: { label: 'NUCLEAR SITES', icon: '☢️', color: 'threat-medium', dotColor: '#eab308' },
  cyber_attack: { label: 'CYBER ATTACKS', icon: '💻', color: 'threat-info', dotColor: '#0ea5e9' },
  naval_movement: { label: 'NAVAL MOVEMENTS', icon: '🚢', color: 'threat-info', dotColor: '#0ea5e9' },
  pipeline: { label: 'PIPELINES', icon: '🔧', color: 'threat-low', dotColor: '#16a34a' },
  cable: { label: 'UNDERSEA CABLES', icon: '🔗', color: 'threat-low', dotColor: '#16a34a' },
  shipping: { label: 'SHIPPING ROUTES', icon: '📦', color: 'threat-info', dotColor: '#0ea5e9' },
  geopolitical: { label: 'GEOPOLITICAL', icon: '🌍', color: 'threat-medium', dotColor: '#eab308' },
  natural_disaster: { label: 'NATURAL DISASTERS', icon: '🌋', color: 'threat-high', dotColor: '#f97316' },
};

export const regionLabels: Record<Region, string> = {
  all: 'GLOBAL',
  europe: 'EUROPE',
  americas: 'AMERICAS',
  asia: 'ASIA',
  africa: 'AFRICA',
  middle_east: 'MID EAST',
  oceania: 'OCEANIA',
};

// Region center coords for map zoom
export const regionCenters: Record<Region, { center: [number, number]; zoom: number }> = {
  all: { center: [10, 20], zoom: 1 },
  europe: { center: [15, 50], zoom: 3.5 },
  americas: { center: [-80, 15], zoom: 2 },
  asia: { center: [100, 30], zoom: 2.2 },
  africa: { center: [20, 5], zoom: 2.5 },
  middle_east: { center: [45, 28], zoom: 3.5 },
  oceania: { center: [140, -25], zoom: 3 },
};

const baseEvents: GeoEvent[] = [
  { id: 'e1', lat: 48.38, lng: 31.17, title: 'Active Conflict – Ukraine', description: 'Ongoing military operations across eastern frontlines. Heavy artillery exchanges reported.', category: 'conflict', threat: 'critical', region: 'europe', timestamp: new Date(), source: 'OSINT' },
  { id: 'e2', lat: 15.37, lng: 44.19, title: 'Yemen – Houthi Maritime Threat', description: 'Anti-ship missile launches targeting commercial vessels in Red Sea corridor.', category: 'conflict', threat: 'critical', region: 'middle_east', timestamp: new Date(), source: 'CENTCOM' },
  { id: 'e3', lat: 33.89, lng: 35.50, title: 'Lebanon – Southern Border', description: 'Cross-border exchanges intensifying. UNIFIL monitoring increased.', category: 'conflict', threat: 'high', region: 'middle_east', timestamp: new Date(), source: 'SIGINT' },
  { id: 'e4', lat: 11.83, lng: 42.59, title: 'Camp Lemonnier, Djibouti', description: 'US AFRICOM forward operating base. Increased drone operations.', category: 'military_base', threat: 'medium', region: 'africa', timestamp: new Date(), source: 'Satellite' },
  { id: 'e5', lat: 25.29, lng: 51.53, title: 'Al Udeid Air Base, Qatar', description: 'US CENTCOM forward headquarters. B-52 deployment confirmed.', category: 'military_base', threat: 'low', region: 'middle_east', timestamp: new Date(), source: 'DoD' },
  { id: 'e6', lat: 51.40, lng: -1.30, title: 'AWE Aldermaston, UK', description: 'Nuclear warhead production and maintenance facility.', category: 'nuclear_site', threat: 'info', region: 'europe', timestamp: new Date(), source: 'Public' },
  { id: 'e7', lat: 37.20, lng: 127.00, title: 'ROK Cyber Command, Seoul', description: 'Elevated DPRK-attributed cyber operations targeting financial infrastructure.', category: 'cyber_attack', threat: 'high', region: 'asia', timestamp: new Date(), source: 'NSA' },
  { id: 'e8', lat: 1.35, lng: 103.82, title: 'Malacca Strait – CSG Transit', description: 'USS Gerald Ford carrier strike group transit eastbound.', category: 'naval_movement', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'AIS' },
  { id: 'e9', lat: 31.77, lng: 35.21, title: 'Gaza – Active Operations', description: 'IDF ground operations ongoing. Humanitarian corridor intermittently active.', category: 'conflict', threat: 'critical', region: 'middle_east', timestamp: new Date(), source: 'OSINT' },
  { id: 'e10', lat: 23.42, lng: 53.85, title: 'ADNOC Pipeline Network, UAE', description: 'Critical energy infrastructure. Drone threat assessment elevated.', category: 'pipeline', threat: 'low', region: 'middle_east', timestamp: new Date(), source: 'SCADA' },
  { id: 'e11', lat: 8.98, lng: -79.52, title: 'Panama Canal – Capacity Alert', description: 'Draft restrictions impacting Neopanamax transits. 18-day queue.', category: 'shipping', threat: 'medium', region: 'americas', timestamp: new Date(), source: 'ACP' },
  { id: 'e12', lat: 55.76, lng: 37.62, title: 'Moscow – Strategic Command', description: 'Nuclear readiness exercises announced. Satellite activity increased.', category: 'geopolitical', threat: 'high', region: 'europe', timestamp: new Date(), source: 'NRO' },
  { id: 'e13', lat: 22.32, lng: 114.17, title: 'PLA Navy – SCS Exercises', description: 'Live-fire naval exercises announced in South China Sea ADIZ.', category: 'geopolitical', threat: 'high', region: 'asia', timestamp: new Date(), source: 'PLA Daily' },
  { id: 'e14', lat: 18.20, lng: 119.50, title: 'SCS Submarine Cable Network', description: 'AAE-1 cable integrity monitoring – anomalous signal degradation.', category: 'cable', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'TeleGeography' },
  { id: 'e15', lat: 64.20, lng: -149.49, title: 'Clear SFS, Alaska', description: 'BMEWS early warning radar station. Arctic monitoring posture.', category: 'military_base', threat: 'low', region: 'americas', timestamp: new Date(), source: 'SPACECOM' },
  { id: 'e16', lat: 4.05, lng: 9.71, title: 'Gulf of Guinea – Maritime Security', description: 'Armed robbery incidents up 40% QoQ. 3 vessels boarded this week.', category: 'naval_movement', threat: 'high', region: 'africa', timestamp: new Date(), source: 'IMB' },
  { id: 'e17', lat: 33.86, lng: 135.77, title: 'Japan – Nankai Trough Alert', description: 'M5.2 earthquake detected. Tsunami advisory issued for coastal prefectures.', category: 'natural_disaster', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'JMA' },
  { id: 'e18', lat: 38.72, lng: -9.14, title: 'NATO Exercise Dynamic Manta', description: 'Anti-submarine warfare exercise. 12 allied nations participating.', category: 'naval_movement', threat: 'info', region: 'europe', timestamp: new Date(), source: 'MARCOM' },
  { id: 'e19', lat: -33.90, lng: 18.40, title: 'WACS Cable Landing, Cape Town', description: 'West Africa Cable System hub. Monitoring for physical tampering.', category: 'cable', threat: 'low', region: 'africa', timestamp: new Date(), source: 'Subsea Intel' },
  { id: 'e20', lat: 25.28, lng: 55.30, title: 'UAE – APT Campaign Detected', description: 'State-sponsored threat actor targeting government email systems.', category: 'cyber_attack', threat: 'high', region: 'middle_east', timestamp: new Date(), source: 'CERT-UAE' },
  { id: 'e21', lat: 14.06, lng: 108.28, title: 'Vietnam EEZ – Standoff', description: 'Chinese survey vessel operating inside Vietnamese EEZ. Coast guard deployed.', category: 'geopolitical', threat: 'medium', region: 'asia', timestamp: new Date(), source: 'VN MoD' },
  { id: 'e22', lat: -7.54, lng: 110.45, title: 'Mt. Merapi – Eruption Warning', description: 'Volcanic activity Level III. Pyroclastic flow risk within 7km radius.', category: 'natural_disaster', threat: 'high', region: 'asia', timestamp: new Date(), source: 'PVMBG' },
  { id: 'e23', lat: 50.45, lng: 30.52, title: 'Kyiv – Air Defense Active', description: 'Shahed-136 drone interceptions. Air raid sirens active across city.', category: 'conflict', threat: 'critical', region: 'europe', timestamp: new Date(), source: 'UkrAF' },
  { id: 'e24', lat: 12.86, lng: 45.03, title: 'Bab el-Mandeb – Rerouting', description: '62% of container traffic now rerouting via Cape of Good Hope.', category: 'shipping', threat: 'high', region: 'middle_east', timestamp: new Date(), source: 'Lloyds' },
  { id: 'e25', lat: 39.03, lng: 125.75, title: 'Yongbyon Nuclear Complex', description: 'Thermal signature indicates reactor activity. IAEA access denied.', category: 'nuclear_site', threat: 'critical', region: 'asia', timestamp: new Date(), source: '38 North' },
  { id: 'e26', lat: 51.88, lng: -176.65, title: 'Adak Naval Station, Alaska', description: 'P-8A Poseidon maritime patrol aircraft forward deployed.', category: 'military_base', threat: 'info', region: 'americas', timestamp: new Date(), source: 'PACFLT' },
  { id: 'e27', lat: -15.79, lng: -47.88, title: 'Brazil – Amazon Fires', description: 'Deforestation fires exceeding 10-year average. Air quality hazardous.', category: 'natural_disaster', threat: 'medium', region: 'americas', timestamp: new Date(), source: 'INPE' },
  { id: 'e28', lat: 41.01, lng: 28.98, title: 'Istanbul – Bosphorus Traffic', description: 'Russian naval vessels transiting under Montreux Convention provisions.', category: 'naval_movement', threat: 'medium', region: 'europe', timestamp: new Date(), source: 'Bosphorus Naval' },
];

const baseNews: NewsItem[] = [
  { id: 'n1', headline: 'NATO defense ministers approve $380B collective spending increase for FY2027', source: 'Reuters', timestamp: new Date(), threat: 'medium', region: 'europe' },
  { id: 'n2', headline: 'State-sponsored ransomware campaign disrupts Eastern European power grid', source: 'CrowdStrike', timestamp: new Date(), threat: 'critical', region: 'europe' },
  { id: 'n3', headline: 'Red Sea shipping insurance premiums surge 400% as Houthi attacks escalate', source: 'Lloyd\'s', timestamp: new Date(), threat: 'high', region: 'middle_east' },
  { id: 'n4', headline: 'PLA Eastern Theater Command announces live-fire exercises near Taiwan Strait', source: 'Xinhua', timestamp: new Date(), threat: 'high', region: 'asia' },
  { id: 'n5', headline: 'UNSC emergency session deadlocked on Middle East ceasefire resolution', source: 'AP', timestamp: new Date(), threat: 'critical', region: 'middle_east' },
  { id: 'n6', headline: 'SAT-3/WASC submarine cable severed off Ivory Coast — 8 nations affected', source: 'TeleGeography', timestamp: new Date(), threat: 'medium', region: 'africa' },
  { id: 'n7', headline: 'IAEA inspectors denied access to Natanz enrichment facility for second month', source: 'IAEA', timestamp: new Date(), threat: 'high', region: 'middle_east' },
  { id: 'n8', headline: 'Panama Canal Authority restricts daily transits to 22 vessels — 40% below capacity', source: 'FT', timestamp: new Date(), threat: 'medium', region: 'americas' },
  { id: 'n9', headline: 'Belgium detains three suspected Congo war crimes participants in ICC probe', source: 'France24', timestamp: new Date(), threat: 'medium', region: 'europe' },
  { id: 'n10', headline: 'Russian Northern Fleet conducts largest Arctic exercise since Cold War', source: 'Janes', timestamp: new Date(), threat: 'high', region: 'europe' },
  { id: 'n11', headline: 'Magnitude 6.8 earthquake strikes off Hokkaido — tsunami watch issued', source: 'JMA', timestamp: new Date(), threat: 'high', region: 'asia' },
  { id: 'n12', headline: 'Lazarus Group deploys zero-day exploit targeting global energy sector SCADA systems', source: 'Mandiant', timestamp: new Date(), threat: 'critical', region: 'all' },
];

export function getEvents(): GeoEvent[] {
  return baseEvents.map(e => ({
    ...e,
    timestamp: new Date(Date.now() - Math.random() * 14400000),
  }));
}

export function getNews(): NewsItem[] {
  return baseNews.map(n => ({
    ...n,
    timestamp: new Date(Date.now() - Math.random() * 7200000),
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
