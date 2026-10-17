// Проверка чистых функций на трёх наборах входных данных.

import assert from 'node:assert/strict';
import { BOOKS, GENRES } from '../js/data/books.js';
import {
  DEFAULT_FILTERS,
  filterBooks,
  sortBooks,
  selectBooks,
  toggleId,
  parseStored,
} from '../js/lib/books.js';

const genreKeys = GENRES.map((genre) => genre.key);

// Набор 1: обычный список из пяти книг
const small = BOOKS.slice(0, 5);
// Набор 2: пустой список
const empty = [];
// Набор 3: полный каталог из 40 книг
const full = BOOKS;

let passed = 0;
function check(name, fn) {
  fn();
  passed += 1;
  console.log(`ok ${passed}. ${name}`);
}

check('набор 1: поиск по автору без учёта регистра', () => {
  const result = filterBooks(small, { ...DEFAULT_FILTERS, query: 'БРЭДБЕРИ' });
  assert.deepEqual(result.map((b) => b.id), [5]);
});

check('набор 1: сортировка по году не меняет исходный массив', () => {
  const before = small.map((b) => b.id);
  const sorted = sortBooks(small, 'year');
  assert.deepEqual(small.map((b) => b.id), before);
  assert.deepEqual(sorted.map((b) => b.year), [1972, 1964, 1961, 1953, 1924]);
});

check('набор 2: пустой список даёт пустой результат', () => {
  assert.deepEqual(selectBooks(empty, DEFAULT_FILTERS), []);
});

check('набор 2: сортировка пустого списка не падает', () => {
  assert.deepEqual(sortBooks(empty, 'rating'), []);
});

check('набор 3: фильтр по жанру', () => {
  const result = filterBooks(full, { ...DEFAULT_FILTERS, genre: 'fantasy' });
  assert.equal(result.length, 8);
  assert.ok(result.every((b) => b.genre === 'fantasy'));
});

check('набор 3: только доступные', () => {
  const result = filterBooks(full, { ...DEFAULT_FILTERS, onlyAvailable: true });
  assert.ok(result.length > 0 && result.every((b) => b.available));
});

check('набор 3: буква ё и е считаются одинаковыми', () => {
  const result = filterBooks(full, { ...DEFAULT_FILTERS, query: 'федор' });
  assert.deepEqual(result.map((b) => b.id), [9]);
});

check('набор 3: сортировка по рейтингу, лучшие первыми', () => {
  const sorted = sortBooks(full, 'rating');
  assert.equal(sorted[0].rating, 4.8);
  assert.ok(sorted.every((b, i) => i === 0 || sorted[i - 1].rating >= b.rating));
});

check('toggleId добавляет и убирает без изменения исходного списка', () => {
  const ids = [1, 2];
  assert.deepEqual(toggleId(ids, 3), [1, 2, 3]);
  assert.deepEqual(toggleId(ids, 1), [2]);
  assert.deepEqual(ids, [1, 2]);
});

check('parseStored: мусор в хранилище даёт значения по умолчанию', () => {
  const fallback = { filters: { ...DEFAULT_FILTERS }, wish: [] };
  assert.deepEqual(parseStored('{не json', BOOKS, genreKeys), fallback);
  assert.deepEqual(parseStored(null, BOOKS, genreKeys), fallback);
  assert.deepEqual(parseStored('42', BOOKS, genreKeys), fallback);
});

check('parseStored: неизвестные жанр, сортировка и id отбрасываются', () => {
  const raw = JSON.stringify({
    filters: { query: 'лем', genre: 'nope', sort: 'toString', onlyAvailable: true },
    wish: [1, 999, 'x'],
  });
  const result = parseStored(raw, BOOKS, genreKeys);
  assert.equal(result.filters.genre, 'all');
  assert.equal(result.filters.sort, 'title');
  assert.equal(result.filters.query, 'лем');
  assert.equal(result.filters.onlyAvailable, true);
  assert.deepEqual(result.wish, [1]);
});

check('в каталоге 40 книг и 5 жанров, идентификаторы уникальны', () => {
  assert.equal(BOOKS.length, 40);
  assert.equal(GENRES.length, 5);
  assert.equal(new Set(BOOKS.map((b) => b.id)).size, 40);
});

console.log(`\nПроверок выполнено: ${passed}, ошибок нет`);
