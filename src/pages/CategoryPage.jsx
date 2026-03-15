import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../utils/api";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

function formatTitle(topic) {
  return topic.charAt(0).toUpperCase() + topic.slice(1);
}

function CategoryPage() {
  const { topic } = useParams();

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
  }, [topic]);

  useEffect(() => {
    async function loadCategoryBooks() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchBooks({ topic, page });

        setBooks(data.results || []);
        setHasNext(Boolean(data.next));
        setHasPrevious(Boolean(data.previous));
      } catch (err) {
        setError(err.message || "Noe gikk galt.");
      } finally {
        setLoading(false);
      }
    }

    loadCategoryBooks();
  }, [topic, page]);

  return (
    <section className="page-section">
      <div className="page-heading">
        <h2>{formatTitle(topic)}</h2>
        <p>Bøker innen kategorien {formatTitle(topic)}.</p>
      </div>

      {loading && <p className="status-message">Laster kategori...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className="status-message">Ingen bøker funnet i denne kategorien.</p>
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

export default CategoryPage;
