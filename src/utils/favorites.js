const FAVORITES_KEY = "gutendex-favorites";

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(bookId) {
  const favorites = getFavorites();
  return favorites.some((book) => book.id === bookId);
}

export function toggleFavorite(book) {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === book.id);

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter((item) => item.id !== book.id);
  } else {
    updatedFavorites = [...favorites, book];
  }

  saveFavorites(updatedFavorites);
  return updatedFavorites;
}
