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
  active = active.split('/')[0];
  return `<nav class="bottom-nav" aria-label="Navegación principal">${sections.map(({ id, label, icon: symbol }) => `<a href="#/${id}" ${active === id ? 'aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span></a>`).join('')}</nav>`;
}

export function teamCard(team) {
  return `<article class="team-card team-${team.slug}"><a class="team-card-link" href="#/equipos/${team.slug}" aria-label="Conocer a ${team.name}">${emblem(team)}<div><p class="eyebrow">${team.city}</p><h3>${team.name}</h3><p class="team-note">${team.nickname}</p></div><span class="card-cta">Explorar equipo ${icon('arrow')}</span></a></article>`;
}

export function emblem(team) {
  return `<div class="team-emblem ${team.color}" role="img" aria-label="Emblema tipográfico ilustrativo de ${team.name}; no es el escudo oficial">${team.initials}<span aria-hidden="true">●</span></div>`;
}

export function sourceList(sources) {
  return `<ul class="source-list">${sources.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}<span class="sr-only"> (abre en otra pestaña)</span> ↗</a></li>`).join('')}</ul>`;
}

export function performance(stats) {
  const { wins, losses, pct, runsFor, runsAgainst } = stats;
  const available = value => Number.isFinite(value) && value >= 0;
  const number = value => available(value) ? value : 'No disponible';
  const percentage = available(pct) ? `${(pct * 100).toFixed(1).replace('.', ',')} %` : 'No disponible';
  const total = available(wins) && available(losses) ? wins + losses : 0;
  const runMax = Math.max(runsFor || 0, runsAgainst || 0);
  return `<dl class="stats-grid">${[['Victorias', number(wins)], ['Derrotas', number(losses)], ['Porcentaje de victorias', percentage], ['Carreras anotadas', number(runsFor)], ['Carreras permitidas', number(runsAgainst)]].map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
  <div class="performance-grid"><figure class="chart"><figcaption>Balance de resultados</figcaption>${total ? `<div class="result-bar" role="img" aria-label="${wins} victorias y ${losses} derrotas en ${total} juegos con decisión"><span style="width:${wins / total * 100}%"></span></div><p class="chart-legend"><span><i></i>${wins} victorias</span><span><i></i>${losses} derrotas</span></p><p class="small-note">${total} juegos con decisión · La barra representa victorias y derrotas.</p>` : '<p>No disponible</p>'}</figure>
  <figure class="chart"><figcaption>Producción y defensa</figcaption>${available(runsFor) && available(runsAgainst) && runMax ? `<div class="run-row"><span>Anotadas <strong>${runsFor}</strong></span><div class="run-track"><span style="width:${runsFor / runMax * 100}%"></span></div></div><div class="run-row conceded"><span>Permitidas <strong>${runsAgainst}</strong></span><div class="run-track"><span style="width:${runsAgainst / runMax * 100}%"></span></div></div><p class="small-note">Diferencial: ${runsFor - runsAgainst > 0 ? '+' : ''}${runsFor - runsAgainst} carreras. Barras desde cero, con una escala común dentro de esta ficha.</p>` : '<p>No disponible</p>'}</figure></div>`;
}
