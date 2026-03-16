const BASE_URL = "https://gutendex.com/books";

export async function fetchBooks({ search = "", topic = "", page = 1 } = {}) {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (topic.trim()) {
    params.set("topic", topic.trim());
  }

  params.set("page", String(page));

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente bøker.");
  }

  return await response.json();
}

export async function fetchBookById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente bokdetaljer.");
  }

  return await response.json();
}

export function getBookCover(book) {
  return (
    book?.formats?.["image/jpeg"] ||
    "https://via.placeholder.com/400x600?text=No+Cover"
  );
}

export function getReadableFormatLink(book) {
  const formats = book?.formats || {};

  return (
    formats["text/html"] ||
    formats["text/html; charset=utf-8"] ||
    formats["application/epub+zip"] ||
    formats["text/plain; charset=utf-8"] ||
    formats["text/plain"] ||
    null
  );
}
