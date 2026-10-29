import { sections } from '../data/content.js';

const paths = {
  home: '<path d="m3 10 9-7 9 7v10H15v-6H9v6H3Z"/>',
  shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="M6 5c7 4 7 10 0 14M18 5c-7 4-7 10 0 14"/>',
  scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M7 12h10m-5-5v10"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 5-5 4 4 4-7 5 8"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
};
export const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.ball}</svg>`;

export function navigation(active) {
  return `<nav class="bottom-nav" aria-label="Navegación principal">${sections.map(({ id, label, icon: symbol }) => `<a href="#/${id}" ${active === id ? 'aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span></a>`).join('')}</nav>`;
}

export function teamCard(team) {
  return `<article class="team-card"><div class="team-emblem ${team.color}" aria-hidden="true">${team.initials}<span>●</span></div><div><p class="eyebrow">${team.city}</p><h3>${team.name}</h3><p class="team-note">${team.nickname}</p></div></article>`;
}
