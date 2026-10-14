import { test } from 'node:test';
import assert from 'node:assert/strict';
import { catalog, catalogPage, catalogPages, catalogRoute } from './catalog.mjs';

test('каталог: у каждого плагина есть репозиторий, команда установки и описание на трёх языках', () => {
  const ids = new Set();
  for (const p of catalog.plugins) {
    assert.ok(!ids.has(p.id), `повтор ${p.id}`);
    ids.add(p.id);
    assert.match(p.repo, /^[\w.-]+\/[\w.-]+$/, `${p.id}: repo`);
    assert.match(p.install, /^[\w.-]+@[\w.-]+$/, `${p.id}: install`);
    assert.match(p.updated, /^\d{4}-\d{2}-\d{2}$/, `${p.id}: updated`);
    for (const lang of ['ru', 'uz', 'en']) assert.ok(p.desc[lang]?.trim(), `${p.id}: нет описания ${lang}`);
  }
});

test('каталог: на каждой странице источник, лицензия, предупреждение и команды установки', () => {
  for (const { routePath, content } of catalogPages()) {
    assert.ok(content.includes('Apache-2.0'), `${routePath}: лицензия`);
    assert.ok(content.includes(catalog.source.dataset), `${routePath}: ссылка на набор данных`);
    assert.ok(content.includes('promptsklad'), `${routePath}: предупреждение`);
    for (const p of catalog.plugins) {
      assert.ok(content.includes(`/plugin marketplace add ${p.repo}\n/plugin install ${p.install}`), `${routePath}: ${p.id}`);
    }
  }
  assert.deepEqual(catalogPages().map((p) => p.routePath), ['/catalog', '/uz/catalog', '/en/catalog']);
});

test('каталог: HOL упоминается только в строке об источнике данных (её требует лицензия)', () => {
  for (const { routePath, content } of catalogPages()) {
    const lines = content.split('\n').filter((l) => /\bhol\b|hol\.org|hol-plugin/i.test(l));
    assert.equal(lines.length, 1, `${routePath}: ${lines.join(' | ')}`);
    assert.match(lines[0], /^<small>.*hol-plugin-security.*Apache-2\.0/, routePath);
  }
  assert.equal(catalogRoute('ru'), '/catalog');
});

test('каталог: описание с HTML и {} экранируется, плагины — по звёздам', () => {
  const saved = catalog.plugins;
  try {
    catalog.plugins = [
      { ...saved[0], id: 'a', name: 'A', stars: 1, desc: { ru: '<script>x</script> {y}', uz: 'u', en: 'e' } },
      { ...saved[0], id: 'b', name: 'B', stars: 9 },
    ];
    const md = catalogPage('ru');
    assert.doesNotMatch(md, /<script>|\{y\}/);
    assert.match(md, /&lt;script&gt;x&lt;\/script&gt; &#123;y&#125;/);
    assert.ok(md.indexOf('## B') < md.indexOf('## A'));
  } finally {
    catalog.plugins = saved;
  }
});
