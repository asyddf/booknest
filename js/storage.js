// Работа с localStorage. Если хранилище недоступно, приложение продолжает работать.

const KEY = 'booknest:state:v1';

export function loadRaw() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Хранилище закрыто или переполнено: состояние просто не сохранится.
  }
}
