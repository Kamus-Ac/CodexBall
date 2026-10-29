import { sections, teams, getTeam, season, history } from '../data/content.js';
import { icon, teamCard, emblem, sourceList, performance } from '../components/ui.js';

export function home() {
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow light"><span class="live-dot"></span> EL REY DE LOS DEPORTES</p><h1>Una pelota.<br>Todo un <em>país.</em></h1><p>La historia, los equipos y la pasión que hacen del béisbol una tradición mexicana.</p><a class="button" href="#/equipos">Conoce a los equipos ${icon('arrow')}</a><span class="hero-caption">BIENVENIDO AL DIAMANTE</span></div><div class="field-art" aria-hidden="true"><div class="field-ring ring-one"></div><div class="field-ring ring-two"></div><div class="diamond"><span class="base b1"></span><span class="base b2"></span><span class="base b3"></span><span class="pitcher"></span></div><div class="baseball"><i></i><b></b></div><span class="art-label">MÉXICO / BÉISBOL</span></div></section>
  <section class="history section-space"><div><p class="eyebrow red-text">NUESTRAS RAÍCES</p><h2>Más que un juego,<br>una tradición.</h2></div><div>${history.intro.map(text => `<p>${text}</p>`).join('')}<span class="text-tag">DESDE EL BARRIO HASTA LAS GRADAS</span></div></section>
  <section class="section-space" aria-labelledby="timeline-title"><p class="eyebrow red-text">HUELLAS EN EL DIAMANTE</p><h2 id="timeline-title">Un recorrido por nuestra pelota.</h2><ol class="timeline">${history.timeline.map(event => `<li><span class="timeline-year">${event.year}</span><h3>${event.title}</h3><p>${event.text}</p><a class="timeline-source" href="${history.sources[event.source].url}" target="_blank" rel="noopener noreferrer">Consultar fuente ↗<span class="sr-only"> (abre en otra pestaña)</span></a>${event.year === '1939–1940' ? `<a class="timeline-source" href="${history.sources[3].url}" target="_blank" rel="noopener noreferrer">Historia de Diablos ↗<span class="sr-only"> (abre en otra pestaña)</span></a>` : ''}</li>`).join('')}</ol></section>
  <section class="league-feature section-space"><div><p class="eyebrow light">LIGA MEXICANA DE BÉISBOL</p><h2>Un país unido por el diamante.</h2><p>Fundada por Ernesto Carmona y “Fray Nano”, la LMB cumplió un siglo en 2025. Su historia reúne ciudades, figuras y generaciones que han dado vida al béisbol profesional de verano.</p><a class="button" href="#/equipos">Explorar sus equipos ${icon('arrow')}</a></div><div class="league-mark" aria-hidden="true"><span>DESDE</span><strong>1925</strong><span>HISTORIA EN CADA ENTRADA</span></div></section>
  <section class="section-space"><div class="section-heading"><div><p class="eyebrow red-text">LOS PROTAGONISTAS</p><h2>Cuatro equipos. Una pasión.</h2></div><a class="text-link" href="#/equipos">Ver equipos ${icon('arrow')}</a></div><div class="team-grid">${teams.map(teamCard).join('')}</div><p class="small-note">Una primera selección para explorar el béisbol mexicano. No representa a todos los equipos de la liga.</p></section>
  <section class="explore section-space"><div><p class="eyebrow light">EL SIGUIENTE LANZAMIENTO</p><h2>El juego apenas comienza.</h2><p>Descubre lo que viene para CodexBall.</p></div><div class="explore-links">${sections.slice(2).map(s => `<a href="#/${s.id}">${icon(s.icon)}<span>${s.label}</span>${icon('arrow')}</a>`).join('')}</div></section><section class="sources section-space"><h2>Para seguir la historia</h2>${sourceList(history.sources)}<p class="small-note">Fuentes consultadas el 29 de octubre de 2026. Textos sintetizados para CodexBall.</p></section>`;
}

export function teamPage() {
  return `<section class="page-intro"><p class="eyebrow red-text">IDENTIDAD EN CADA DIAMANTE</p><h1>Los equipos.</h1><p>Del norte a la península, conoce cuatro nombres del béisbol mexicano. Cada ciudad tiene su manera de vivir la pelota.</p></section><section aria-label="Selección de equipos"><div class="team-grid">${teams.map(teamCard).join('')}</div><p class="small-note">Emblemas tipográficos ilustrativos; no son escudos oficiales. Selección inicial de equipos de la LMB.</p></section>`;
}

export function teamDetail(slug) {
  const team = getTeam(slug);
  if (!team) return notFound();
  return `<div class="team-detail team-${team.slug}"><nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/equipos">Equipos</a><span aria-hidden="true">/</span><span aria-current="page">${team.name}</span></nav>
  <section class="team-hero">${emblem(team)}<div><p class="eyebrow light">LMB · ZONA ${team.zone.toUpperCase()}</p><h1>${team.name}</h1><p>${team.nickname}</p></div></section>
  <p class="small-note">Escudo oficial: No disponible. Se muestra un emblema tipográfico ilustrativo mientras se verifica una autorización de uso.</p>
  <dl class="club-facts">${[['Ciudad', team.city], ['Estadio', team.stadium], ['Zona LMB', team.zone], ['Inicio de su historia', team.founded]].map(([label, value]) => `<div><dt>${label}</dt><dd>${value || 'No disponible'}</dd></div>`).join('')}</dl>
  <div class="club-story section-space"><section><p class="eyebrow red-text">IDENTIDAD Y TRADICIÓN</p><h2>La historia del club.</h2>${team.history.map(text => `<p>${text}</p>`).join('')}</section><section class="honors"><p class="eyebrow red-text">MOMENTOS PARA RECORDAR</p><h2>Logros en el diamante.</h2><ul>${team.achievements.map(text => `<li>${text}</li>`).join('')}</ul><p class="small-note">${team.honorsNote}</p></section></div>
  <section class="season-section section-space" aria-labelledby="season-title"><div class="section-heading"><div><p class="eyebrow red-text">EL EQUIPO EN NÚMEROS</p><h2 id="season-title">${season.phase} · ${season.season}</h2></div><span class="season-badge">Corte: 6 ago ${season.season}</span></div><p class="data-note">${season.note}</p>${performance(team.stats)}<p class="small-note">Porcentaje oficial PCT: ${Number.isFinite(team.stats.pct) ? team.stats.pct.toFixed(3) : 'No disponible'}. La cifra porcentual se presenta con un decimal.</p></section>
  <section class="sources section-space"><h2>Fuentes y procedencia</h2><h3>Historia, logros y sede</h3>${sourceList(team.sources)}<h3>Estadísticas de temporada regular</h3>${sourceList(season.sources)}<p class="small-note">Consulta: 29 de octubre de 2026. Los enlaces de posiciones pueden cambiar de temporada; esta ficha conserva el corte local indicado. La sede corresponde a la información de LMB al consultar.</p></section>
  <section class="section-space"><h2>Otros diamantes por descubrir</h2><div class="team-grid related-teams">${teams.filter(item => item.slug !== slug).map(teamCard).join('')}</div></section></div>`;
}

const upcoming = {
  juego: ['Tu próximo turno al bat.', 'Estamos preparando una experiencia de juego inspirada en el diamante. Por ahora, sigue explorando la historia y los equipos.'],
  ar: ['El diamante, en otra dimensión.', 'Aquí podrás descubrir una futura experiencia de realidad aumentada. Esta primera versión no activa la cámara ni solicita permisos.'],
  trivia: ['La pasión también se sabe.', 'Un espacio para poner a prueba lo que conoces del béisbol mexicano. Las preguntas y los retos llegarán en una próxima iteración.'],
  galeria: ['Historias que se ven.', 'Este espacio reunirá imágenes del mundo del béisbol mexicano. La galería todavía está en preparación.'],
};
export function placeholder(route) {
  const section = sections.find(s => s.id === route);
  const [title, description] = upcoming[route];
  return `<section class="placeholder"><div class="placeholder-icon">${icon(section.icon)}</div><p class="eyebrow red-text">${section.label.toUpperCase()} · PRÓXIMAMENTE</p><h1>${title}</h1><p>${description}</p><span class="status-pill">En preparación</span><a class="button dark-button" href="#/inicio">Volver al inicio ${icon('arrow')}</a></section>`;
}

export const notFound = () => `<section class="placeholder"><p class="eyebrow red-text">FUERA DEL DIAMANTE · 404</p><h1>Esta sección no existe.</h1><a class="button dark-button" href="#/inicio">Volver al inicio ${icon('arrow')}</a></section>`;
