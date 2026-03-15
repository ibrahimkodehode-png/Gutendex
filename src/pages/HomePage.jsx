import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBooks } from "../utils/api";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchBooks({ search, page });

        setBooks(data.results || []);
        setHasNext(Boolean(data.next));
        setHasPrevious(Boolean(data.previous));
      } catch (err) {
        setError(err.message || "Noe gikk galt.");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [search, page]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <h2>{search ? `Søkeresultater for "${search}"` : "Populære bøker"}</h2>
        <p>Finn klassiske bøker, forfattere og litteratur fra Gutendex.</p>
      </div>

      {loading && <p className="status-message">Laster bøker...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="status-message">Ingen bøker funnet.</p>
      )}

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {!loading && !error && books.length > 0 && (
        <Pagination
          page={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}

export default HomePage;
