import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, sections, teams, season } from '../src/data/content.js';
import { home, teamPage, teamDetail, placeholder, notFound } from '../src/pages/views.js';
import { navigation, performance } from '../src/components/ui.js';

test('todas las secciones admiten enlaces directos por hash', () => {
  for (const { id } of sections) assert.equal(resolveRoute(`#/${id}`), id);
  assert.equal(resolveRoute(''), 'inicio');
  assert.equal(resolveRoute('#/desconocida'), '404');
});

test('rutas de equipos válidas, barra final y rutas desconocidas', () => {
  for (const team of teams) {
    assert.equal(resolveRoute(`#/equipos/${team.slug}`), `equipos/${team.slug}`);
    assert.equal(resolveRoute(`#/equipos/${team.slug}/`), `equipos/${team.slug}`);
    const nav = navigation(`equipos/${team.slug}`);
    assert.ok(nav.includes('href="#/equipos" aria-current="page"'));
    assert.equal((nav.match(/aria-current/g) || []).length, 1);
  }
  for (const hash of ['#/equipos/inventado', '#/equipos/sultanes/extra', '#/equipos/<script>', '#/equipos//toros']) {
    assert.equal(resolveRoute(hash), '404');
  }
});

test('fichas reutilizables con enlaces internos, procedencia y datos de un mismo corte', () => {
  assert.equal(season.season, 2026);
  assert.equal(teams.length, 4);
  assert.equal(new Set(teams.map(team => team.slug)).size, 4);
  for (const team of teams) {
    const route = `#/equipos/${team.slug}`;
    assert.ok(teamPage().includes(`href="${route}"`));
    assert.ok(home().includes(`href="${route}"`));
    const html = teamDetail(team.slug);
    for (const text of [team.name, team.city, team.stadium, 'Temporada regular · 2026', 'Fuentes y procedencia', 'Escudo oficial: No disponible']) assert.ok(html.includes(text));
    for (const source of [...team.sources, ...season.sources]) {
      assert.ok(source.url.startsWith('https://'));
      assert.ok(html.includes(`href="${source.url}"`));
    }
    const { wins, losses, pct, runsFor, runsAgainst } = team.stats;
    assert.equal(Number((wins / (wins + losses)).toFixed(3)), pct);
    assert.ok(Number.isInteger(runsFor) && Number.isInteger(runsAgainst));
    for (const value of [wins, losses, runsFor, runsAgainst]) assert.ok(html.includes(String(value)));
    assert.ok(html.includes('role="img"'));
  }
  assert.ok(teamDetail('inexistente').includes('404'));
});

test('las estadísticas ausentes no se convierten en cifras inventadas', () => {
  const html = performance({ wins: null, losses: null, pct: null, runsFor: null, runsAgainst: null });
  assert.ok(html.includes('No disponible'));
  assert.ok(!/NaN|Infinity|width:/.test(html));
});
test('navegación identifica una sola sección activa y enlaza todas las vistas', () => {
  for (const { id } of sections) {
    const html = navigation(id);
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
    for (const section of sections) assert.ok(html.includes(`href="#/${section.id}"`));
  }
});
test('las vistas muestran el contenido requerido y estados provisionales', () => {
  for (const team of teams) {
    assert.ok(home().includes(team.name));
    assert.ok(teamPage().includes(team.name));
  }
  for (const { id } of sections.slice(2)) assert.ok(placeholder(id).includes('PRÓXIMAMENTE'));
  assert.ok(notFound().includes('404'));
});
