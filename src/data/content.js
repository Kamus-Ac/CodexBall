import teamData from './teams.json' with { type: 'json' };
import historyData from './history.json' with { type: 'json' };

export const season = teamData;
export const history = historyData;
export const teams = teamData.teams;
export const getTeam = (slug) => teams.find(team => team.slug === slug);

export const sections = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'equipos', label: 'Equipos', icon: 'shield' },
  { id: 'juego', label: 'Juego', icon: 'ball' },
  { id: 'ar', label: 'AR', icon: 'scan' },
  { id: 'trivia', label: 'Trivia', icon: 'bolt' },
  { id: 'galeria', label: 'Galería', icon: 'image' },
];

export function resolveRoute(hash) {
  const id = hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'inicio';
  if (/^equipos\/[^/]+$/.test(id) && getTeam(id.split('/')[1])) return id;
  return sections.some((section) => section.id === id) ? id : '404';
}
