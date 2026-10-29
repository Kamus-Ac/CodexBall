import './styles/main.css';
import { resolveRoute, getTeam } from './data/content.js';
import { icon, navigation } from './components/ui.js';
import { home, teamPage, teamDetail, placeholder, notFound } from './pages/views.js';

function render() {
  const route = resolveRoute(window.location.hash);
  const team = route.startsWith('equipos/') ? getTeam(route.split('/')[1]) : null;
  const view = team ? teamDetail(team.slug) : route === 'inicio' ? home() : route === 'equipos' ? teamPage() : route === '404' ? notFound() : placeholder(route);
  document.querySelector('#app').innerHTML = `<header class="site-header"><a href="#/inicio" class="brand" aria-label="CodexBall, inicio"><span class="brand-icon">${icon('ball')}</span>CODEX<span>BALL</span><span class="brand-dot">.</span></a><span class="header-caption">BÉISBOL HECHO PASIÓN</span><span class="edition">EDICIÓN / MÉXICO</span></header><main id="main" tabindex="-1">${view}</main><footer><span class="footer-brand">CODEXBALL.</span><p>Hecho para vivir el béisbol mexicano.</p><span>Proyecto independiente · Primera edición</span></footer>${navigation(route)}`;
  document.title = `${team?.name || ({ inicio: 'Inicio', equipos: 'Equipos', juego: 'Juego', ar: 'AR', trivia: 'Trivia', galeria: 'Galería' })[route] || 'Sección no encontrada'} · CodexBall`;
}
render();
document.querySelector('.skip-link').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('main').focus();
});
window.addEventListener('hashchange', () => {
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.querySelector('main').focus({ preventScroll: true });
});
