// Данные каталога: 5 жанров и 40 книг. Сервер не используется.

export const GENRES = [
  { key: 'scifi', label: 'Фантастика' },
  { key: 'classic', label: 'Классика' },
  { key: 'detective', label: 'Детектив' },
  { key: 'science', label: 'Научпоп' },
  { key: 'fantasy', label: 'Фэнтези' },
];

export const BOOKS = [
  { id: 1, title: 'Солярис', author: 'Станислав Лем', year: 1961, genre: 'scifi', rating: 4.6, available: true },
  { id: 2, title: 'Мы', author: 'Евгений Замятин', year: 1924, genre: 'scifi', rating: 4.3, available: true },
  { id: 3, title: 'Пикник на обочине', author: 'Аркадий и Борис Стругацкие', year: 1972, genre: 'scifi', rating: 4.7, available: false },
  { id: 4, title: 'Трудно быть богом', author: 'Аркадий и Борис Стругацкие', year: 1964, genre: 'scifi', rating: 4.5, available: true },
  { id: 5, title: '451 градус по Фаренгейту', author: 'Рэй Брэдбери', year: 1953, genre: 'scifi', rating: 4.4, available: true },
  { id: 6, title: 'Марсианские хроники', author: 'Рэй Брэдбери', year: 1950, genre: 'scifi', rating: 4.4, available: false },
  { id: 7, title: 'Задача трёх тел', author: 'Лю Цысинь', year: 2008, genre: 'scifi', rating: 4.3, available: true },
  { id: 8, title: 'Я, робот', author: 'Айзек Азимов', year: 1950, genre: 'scifi', rating: 4.5, available: true },

  { id: 9, title: 'Преступление и наказание', author: 'Фёдор Достоевский', year: 1866, genre: 'classic', rating: 4.7, available: true },
  { id: 10, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1967, genre: 'classic', rating: 4.8, available: false },
  { id: 11, title: 'Отцы и дети', author: 'Иван Тургенев', year: 1862, genre: 'classic', rating: 4.3, available: true },
  { id: 12, title: 'Анна Каренина', author: 'Лев Толстой', year: 1878, genre: 'classic', rating: 4.5, available: true },
  { id: 13, title: 'Путь Абая', author: 'Мухтар Ауэзов', year: 1942, genre: 'classic', rating: 4.6, available: true },
  { id: 14, title: 'Тихий Дон', author: 'Михаил Шолохов', year: 1940, genre: 'classic', rating: 4.4, available: false },
  { id: 15, title: 'Герой нашего времени', author: 'Михаил Лермонтов', year: 1840, genre: 'classic', rating: 4.4, available: true },
  { id: 16, title: 'Старик и море', author: 'Эрнест Хемингуэй', year: 1952, genre: 'classic', rating: 4.5, available: true },

  { id: 17, title: 'Убийство в Восточном экспрессе', author: 'Агата Кристи', year: 1934, genre: 'detective', rating: 4.6, available: true },
  { id: 18, title: 'Собака Баскервилей', author: 'Артур Конан Дойл', year: 1902, genre: 'detective', rating: 4.6, available: true },
  { id: 19, title: 'И никого не стало', author: 'Агата Кристи', year: 1939, genre: 'detective', rating: 4.6, available: false },
  { id: 20, title: 'Имя розы', author: 'Умберто Эко', year: 1980, genre: 'detective', rating: 4.4, available: true },
  { id: 21, title: 'Мальтийский сокол', author: 'Дэшил Хэммет', year: 1930, genre: 'detective', rating: 4.1, available: true },
  { id: 22, title: 'Девушка с татуировкой дракона', author: 'Стиг Ларссон', year: 2005, genre: 'detective', rating: 4.2, available: false },
  { id: 23, title: 'Большой сон', author: 'Реймонд Чандлер', year: 1939, genre: 'detective', rating: 4.1, available: true },
  { id: 24, title: 'Этюд в багровых тонах', author: 'Артур Конан Дойл', year: 1887, genre: 'detective', rating: 4.3, available: true },

  { id: 25, title: 'Краткая история времени', author: 'Стивен Хокинг', year: 1988, genre: 'science', rating: 4.5, available: false },
  { id: 26, title: 'Sapiens. Краткая история человечества', author: 'Юваль Ной Харари', year: 2011, genre: 'science', rating: 4.4, available: true },
  { id: 27, title: 'Космос', author: 'Карл Саган', year: 1980, genre: 'science', rating: 4.7, available: true },
  { id: 28, title: 'Эгоистичный ген', author: 'Ричард Докинз', year: 1976, genre: 'science', rating: 4.3, available: true },
  { id: 29, title: 'Думай медленно… решай быстро', author: 'Даниэль Канеман', year: 2011, genre: 'science', rating: 4.4, available: false },
  { id: 30, title: 'Элегантная Вселенная', author: 'Брайан Грин', year: 1999, genre: 'science', rating: 4.3, available: true },
  { id: 31, title: 'Ружья, микробы и сталь', author: 'Джаред Даймонд', year: 1997, genre: 'science', rating: 4.3, available: true },
  { id: 32, title: 'Чёрный лебедь', author: 'Нассим Николас Талеб', year: 2007, genre: 'science', rating: 4.2, available: true },

  { id: 33, title: 'Властелин колец: Братство Кольца', author: 'Дж. Р. Р. Толкин', year: 1954, genre: 'fantasy', rating: 4.8, available: true },
  { id: 34, title: 'Хоббит', author: 'Дж. Р. Р. Толкин', year: 1937, genre: 'fantasy', rating: 4.7, available: true },
  { id: 35, title: 'Волшебник Земноморья', author: 'Урсула Ле Гуин', year: 1968, genre: 'fantasy', rating: 4.4, available: true },
  { id: 36, title: 'Игра престолов', author: 'Джордж Р. Р. Мартин', year: 1996, genre: 'fantasy', rating: 4.6, available: false },
  { id: 37, title: 'Ведьмак: Последнее желание', author: 'Анджей Сапковский', year: 1993, genre: 'fantasy', rating: 4.5, available: true },
  { id: 38, title: 'Имя ветра', author: 'Патрик Ротфусс', year: 2007, genre: 'fantasy', rating: 4.5, available: true },
  { id: 39, title: 'Лев, колдунья и платяной шкаф', author: 'К. С. Льюис', year: 1950, genre: 'fantasy', rating: 4.4, available: false },
  { id: 40, title: 'Американские боги', author: 'Нил Гейман', year: 2001, genre: 'fantasy', rating: 4.1, available: true },
];
