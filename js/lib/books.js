// Чистые функции: не меняют аргументы и не обращаются к DOM.

export const DEFAULT_FILTERS = Object.freeze({
  query: '',
  genre: 'all',
  sort: 'title',
  onlyAvailable: false,
});

const SORTERS = {
  title: (a, b) => a.title.localeCompare(b.title, 'ru'),
  year: (a, b) => b.year - a.year,
  rating: (a, b) => b.rating - a.rating,
};

// Приводит строку к виду для сравнения: без регистра и с буквой е вместо ё.
export function normalize(text) {
  return String(text).trim().toLowerCase().replaceAll('ё', 'е');
}

export function filterBooks(books, { query, genre, onlyAvailable }) {
  const needle = normalize(query);
  return books.filter((book) => {
    const matchesText =
      needle === '' ||
      normalize(book.title).includes(needle) ||
      normalize(book.author).includes(needle);
    const matchesGenre = genre === 'all' || book.genre === genre;
    const matchesAvailable = !onlyAvailable || book.available;
    return matchesText && matchesGenre && matchesAvailable;
  });
}

// Сортирует копию массива, исходный порядок не меняется.
export function sortBooks(books, sortKey) {
  const compare = SORTERS[sortKey] ?? SORTERS.title;
  return [...books].sort(compare);
}

export function selectBooks(books, filters) {
  return sortBooks(filterBooks(books, filters), filters.sort);
}

// Добавляет id в список или убирает, если он там уже есть.
export function toggleId(ids, id) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function pickByIds(books, ids) {
  return ids.map((id) => books.find((book) => book.id === id)).filter(Boolean);
}

export function formatRating(value) {
  return value.toFixed(1).replace('.', ',');
}

// Разбирает сохранённую строку. При любой ошибке возвращает значения по умолчанию.
export function parseStored(raw, books, genreKeys) {
  const fallback = { filters: { ...DEFAULT_FILTERS }, wish: [] };
  if (typeof raw !== 'string') return fallback;

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return fallback;
  }
  if (data === null || typeof data !== 'object') return fallback;

  const stored = data.filters ?? {};
  const knownIds = new Set(books.map((book) => book.id));

  return {
    filters: {
      query: typeof stored.query === 'string' ? stored.query.slice(0, 60) : DEFAULT_FILTERS.query,
      genre: genreKeys.includes(stored.genre) ? stored.genre : DEFAULT_FILTERS.genre,
      sort: Object.hasOwn(SORTERS, stored.sort) ? stored.sort : DEFAULT_FILTERS.sort,
      onlyAvailable: stored.onlyAvailable === true,
    },
    wish: Array.isArray(data.wish) ? data.wish.filter((id) => knownIds.has(id)) : [],
  };
}
