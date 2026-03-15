const BASE_URL = "https://gutendex.com/books";

export async function fetchBooks({ search = "", topic = "", page = 1 } = {}) {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (topic.trim()) {
    params.set("topic", topic.trim());
  }

  if (page) {
    params.set("page", page);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente bøker fra Gutendex.");
  }

  return response.json();
}

export async function fetchBookById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente bokdetaljer.");
  }

  return response.json();
}

export function getBookFormatLink(book) {
  const formats = book?.formats || {};

  return (
    formats["text/html"] ||
    formats["text/html; charset=utf-8"] ||
    formats["application/epub+zip"] ||
    formats["application/x-mobipocket-ebook"] ||
    formats["text/plain; charset=utf-8"] ||
    formats["text/plain"] ||
    null
  );
}

export function getBookCover(book) {
  const formats = book?.formats || {};

  return (
    formats["image/jpeg"] || "https://via.placeholder.com/300x450?text=No+Cover"
  );
}
