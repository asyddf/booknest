// Отображение: интерфейс полностью строится из объекта state.
// Все пользовательские и внешние данные выводятся через textContent.

import { GENRES } from '../data/books.js';
import { selectBooks, pickByIds, formatRating } from '../lib/books.js';

const GENRE_LABELS = Object.fromEntries(GENRES.map((genre) => [genre.key, genre.label]));

function create(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createCard(book, isWished) {
  const item = create('li', 'catalog__item');
  const card = create('article', `card card--${book.genre}`);

  const title = create('h3', 'card__title');
  const link = create('a', '', book.title);
  link.href = 'book.html';
  title.append(link);

  const meta = create('p', 'card__meta');
  const year = create('time', '', String(book.year));
  year.dateTime = String(book.year);
  meta.append(`${GENRE_LABELS[book.genre]} · `, year, ` · Рейтинг ${formatRating(book.rating)}`);

  const foot = create('footer', 'card__foot');
  const status = create(
    'p',
    `status status--${book.available ? 'ok' : 'off'}`,
    book.available ? 'В наличии' : 'Выдана',
  );

  const button = create('button', 'btn btn--ghost', isWished ? 'В списке' : 'Хочу прочитать');
  button.type = 'button';
  button.dataset.action = 'wish';
  button.dataset.id = String(book.id);
  button.setAttribute('aria-pressed', String(isWished));
  foot.append(status, button);

  card.append(title, create('p', 'card__author', book.author), meta, foot);
  item.append(card);
  return item;
}

function createWishItem(book) {
  const item = create('li', 'wishlist__item');
  const text = create('p', 'wishlist__text');
  text.append(create('span', '', book.title), create('span', 'wishlist__author', book.author));

  const button = create('button', 'btn btn--ghost', 'Убрать');
  button.type = 'button';
  button.dataset.action = 'remove';
  button.dataset.id = String(book.id);
  button.setAttribute('aria-label', `Убрать из списка: ${book.title}`);

  item.append(text, button);
  return item;
}

// Единственная функция отрисовки: принимает состояние и перерисовывает страницу.
export function render(state, refs, books) {
  const visible = selectBooks(books, state.filters);
  const wished = pickByIds(books, state.wish);

  // Поля формы приводятся в соответствие с состоянием, например после восстановления.
  if (refs.query.value !== state.filters.query) refs.query.value = state.filters.query;
  refs.genre.value = state.filters.genre;
  refs.sort.value = state.filters.sort;
  refs.available.checked = state.filters.onlyAvailable;

  refs.count.textContent = `Найдено: ${visible.length} из ${books.length}`;
  refs.empty.hidden = visible.length > 0;
  refs.list.replaceChildren(...visible.map((book) => createCard(book, state.wish.includes(book.id))));

  refs.wishCount.textContent = String(state.wish.length);
  refs.wishEmpty.hidden = wished.length > 0;
  refs.wishList.replaceChildren(...wished.map(createWishItem));
}
