import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById, getBookCover, getBookFormatLink } from "../utils/api";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function BookDetailsPage() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchBookById(id);
        setBook(data);
        setFavorite(isFavorite(data.id));
      } catch (err) {
        setError(err.message || "Noe gikk galt.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  function handleFavorite() {
    toggleFavorite(book);
    setFavorite(!favorite);
  }

  if (loading) {
    return <p className="status-message">Laster bokdetaljer...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  if (!book) {
    return <p className="status-message">Fant ikke boken.</p>;
  }

  const authors =
    book.authors?.map((author) => author.name).join(", ") || "Ukjent";

  const subjects =
    book.subjects?.slice(0, 5).join(", ") || "Ingen kategori tilgjengelig";

  const languages = book.languages?.join(", ") || "Ikke oppgitt";

  const bookLink = getBookFormatLink(book);

  return (
    <section className="details-page">
      <div className="details-card">
        <div className="details-image-wrap">
          <img
            src={getBookCover(book)}
            alt={book.title}
            className="details-image"
          />
        </div>

        <div className="details-content">
          <span className="details-label">Bokdetaljer</span>
          <h2>{book.title}</h2>

          <div className="details-meta">
            <p>
              <strong>Forfatter:</strong> {authors}
            </p>
            <p>
              <strong>Antall nedlastninger:</strong> {book.download_count}
            </p>
            <p>
              <strong>Kategori:</strong> {subjects}
            </p>
            <p>
              <strong>Språk:</strong> {languages}
            </p>
          </div>

          <div className="details-actions">
            <button className="primary-btn" onClick={handleFavorite}>
              {favorite ? "Fjern fra favoritter" : "Legg til i favoritter"}
            </button>

            {bookLink && (
              <a
                href={bookLink}
                target="_blank"
                rel="noreferrer"
                className="secondary-btn"
              >
                Åpne bok
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetailsPage;
