import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, sections, teams } from '../src/data/content.js';
import { home, teamPage, placeholder, notFound } from '../src/pages/views.js';
import { navigation } from '../src/components/ui.js';

test('todas las secciones admiten enlaces directos por hash', () => {
  for (const { id } of sections) assert.equal(resolveRoute(`#/${id}`), id);
  assert.equal(resolveRoute(''), 'inicio');
  assert.equal(resolveRoute('#/desconocida'), '404');
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
