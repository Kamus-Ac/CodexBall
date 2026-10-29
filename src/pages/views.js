import { sections, teams } from '../data/content.js';
import { icon, teamCard } from '../components/ui.js';

export function home() {
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow light"><span class="live-dot"></span> EL REY DE LOS DEPORTES</p><h1>Una pelota.<br>Todo un <em>país.</em></h1><p>La historia, los equipos y la pasión que hacen del béisbol una tradición mexicana.</p><a class="button" href="#/equipos">Conoce a los equipos ${icon('arrow')}</a><span class="hero-caption">BIENVENIDO AL DIAMANTE</span></div><div class="field-art" aria-hidden="true"><div class="field-ring ring-one"></div><div class="field-ring ring-two"></div><div class="diamond"><span class="base b1"></span><span class="base b2"></span><span class="base b3"></span><span class="pitcher"></span></div><div class="baseball"><i></i><b></b></div><span class="art-label">MÉXICO / BÉISBOL</span></div></section>
  <section class="history section-space"><div><p class="eyebrow red-text">NUESTRAS RAÍCES</p><h2>Más que un juego,<br>una tradición.</h2></div><div><p>El béisbol encontró en México un lugar para echar raíces. De los campos de barrio a los grandes estadios, el diamante se convirtió en un punto de encuentro para familias y generaciones.</p><p>La Liga Mexicana de Béisbol, fundada en 1925, forma parte de esa historia. Sus equipos mantienen viva una cultura de rivalidades, identidad regional y pasión por la pelota.</p><span class="text-tag">DESDE EL BARRIO HASTA LAS GRADAS</span></div></section>
  <section class="section-space"><div class="section-heading"><div><p class="eyebrow red-text">LOS PROTAGONISTAS</p><h2>Cuatro equipos. Una pasión.</h2></div><a class="text-link" href="#/equipos">Ver equipos ${icon('arrow')}</a></div><div class="team-grid">${teams.map(teamCard).join('')}</div><p class="small-note">Una primera selección para explorar el béisbol mexicano. No representa a todos los equipos de la liga.</p></section>
  <section class="explore section-space"><div><p class="eyebrow light">EL SIGUIENTE LANZAMIENTO</p><h2>El juego apenas comienza.</h2><p>Descubre lo que viene para CodexBall.</p></div><div class="explore-links">${sections.slice(2).map(s => `<a href="#/${s.id}">${icon(s.icon)}<span>${s.label}</span>${icon('arrow')}</a>`).join('')}</div></section>`;
}

export function teamPage() {
  return `<section class="page-intro"><p class="eyebrow red-text">IDENTIDAD EN CADA DIAMANTE</p><h1>Los equipos.</h1><p>Del norte a la península, conoce cuatro nombres del béisbol mexicano. Cada ciudad tiene su manera de vivir la pelota.</p></section><section aria-label="Selección de equipos"><div class="team-grid">${teams.map(teamCard).join('')}</div><p class="small-note">Emblemas tipográficos ilustrativos; no son escudos oficiales. Selección inicial de equipos de la LMB.</p></section>`;
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
