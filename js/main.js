// Точка входа: единственный объект state, обработчики событий и вызов render().

import { BOOKS, GENRES } from './data/books.js';
import { DEFAULT_FILTERS, parseStored, toggleId } from './lib/books.js';
import { render } from './ui/render.js';
import { loadRaw, save } from './storage.js';

const ref = (name) => document.querySelector(`[data-ref="${name}"]`);

const refs = {
  filters: ref('filters'),
  query: document.querySelector('[name="q"]'),
  genre: document.querySelector('[name="genre"]'),
  sort: document.querySelector('[name="sort"]'),
  available: document.querySelector('[name="available"]'),
  count: ref('count'),
  empty: ref('empty'),
  list: ref('list'),
  wishCount: ref('wish-count'),
  wishEmpty: ref('wish-empty'),
  wishList: ref('wish-list'),
};

// Единственный объект состояния. Всё, что видно на странице, считается из него.
const state = parseStored(
  loadRaw(),
  BOOKS,
  GENRES.map((genre) => genre.key),
);

function update(change) {
  Object.assign(state, change);
  save({ filters: state.filters, wish: state.wish });
  render(state, refs, BOOKS);
}

// Одно событие на всю форму фильтров.
refs.filters.addEventListener('input', () => {
  update({
    filters: {
      query: refs.query.value,
      genre: refs.genre.value,
      sort: refs.sort.value,
      onlyAvailable: refs.available.checked,
    },
  });
});

refs.filters.addEventListener('submit', (event) => event.preventDefault());

// Делегирование: один обработчик кликов на всю страницу вместо обработчика на каждой кнопке.
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === 'wish' || action === 'remove') {
    update({ wish: toggleId(state.wish, Number(id)) });
  } else if (action === 'reset') {
    update({ filters: { ...DEFAULT_FILTERS } });
  }
});

render(state, refs, BOOKS);
